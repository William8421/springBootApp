package com.mallak.socialmediaapp.services;

import com.mallak.socialmediaapp.models.User;
import com.mallak.socialmediaapp.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
        if (isInvalidUser(user)) {
            return new ResponseEntity<>("First name, last name, and username cannot be empty", HttpStatus.BAD_REQUEST);
        }
        if (user.getAge() <= 17) {
            int period = 18 - user.getAge();
            return new ResponseEntity<>("See you in " + period + " year/s", HttpStatus.BAD_REQUEST);
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
        return new ResponseEntity<>("Thank you for Signing up", HttpStatus.CREATED);
    }

    public ResponseEntity<String> authenticateUser(String email, String providedPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(providedPassword, user.getPassword())) {
            return new ResponseEntity<>("Authentication successful!", HttpStatus.OK);
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
                user.getUsername() == null || user.getUsername().isEmpty();
    }

    private boolean emailOrUsernameExists(String email, String username) {
        return userRepository.findByEmail(email) != null || userRepository.findByUsername(username) != null;
    }

    private boolean isValidEmail(String email) {
        return emailPattern.matcher(email).matches();
    }
}
