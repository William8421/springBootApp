package com.mallak.springbootapp.services;

import com.mallak.springbootapp.models.User;
import com.mallak.springbootapp.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.regex.Pattern;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Pattern emailPattern = Pattern.compile("^\\S+@\\S+\\.\\S+$");

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<String> registerUser(User user) {
        try{
            if (isInvalidUser(user)) {
                return new ResponseEntity<>("First name, last name, username and age cannot be empty", HttpStatus.BAD_REQUEST);
            }
            Date currentDate = new Date();
            long ageInMillis = currentDate.getTime() - user.getDateOfBirth().getTime();
            int age = (int) (ageInMillis / (1000L * 60 * 60 * 24 * 365));
            if (age < 18) {
                int remainingYears = 18 - age;
                return new ResponseEntity<>("You must be at least 18 years old to register. Please wait for another " + remainingYears + " year(s).", HttpStatus.BAD_REQUEST);
            }

            if (!isValidEmail(user.getEmail())) {
                return new ResponseEntity<>("Invalid email format", HttpStatus.BAD_REQUEST);
            }
            if (emailOrUsernameExists(user.getEmail(), user.getUsername())) {
                return new ResponseEntity<>("Email or Username already exists", HttpStatus.BAD_REQUEST);
            }

            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            userRepository.save(user);
            return new ResponseEntity<>(user.getUsername() + "&" + user.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<String> authenticateUser(String email, String providedPassword) {
        try{
            User user = userRepository.findByEmail(email);
            if (user != null && passwordEncoder.matches(providedPassword, user.getPassword())) {
                return new ResponseEntity<>(user.getUsername() + "&" + user.getId(), HttpStatus.OK);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>("Either email or password is incorrect!", HttpStatus.BAD_REQUEST);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return (User) authentication.getPrincipal();
        }
        return null;
    }

    private boolean isInvalidUser(User user) {
        return user.getFirstName() == null || user.getFirstName().isEmpty() ||
                user.getLastName() == null || user.getLastName().isEmpty() ||
                user.getUsername() == null || user.getUsername().isEmpty() ||
                user.getDateOfBirth() == null;
    }

    private boolean emailOrUsernameExists(String email, String username) {
        return userRepository.findByEmail(email) != null || userRepository.findByUsername(username) != null;
    }

    private boolean isValidEmail(String email) {
        return emailPattern.matcher(email).matches();
    }
}
