package com.mallak.socialmediaapp.services;

import com.mallak.socialmediaapp.models.User;
import com.mallak.socialmediaapp.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    public final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<Optional<User>> getUserById(String id) {
        try {
            Optional<User> user = userRepository.findById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



    public ResponseEntity<String> editProfile(User user) {
        try {
            User existingUser = userRepository.findById(user.getId()).orElse(null);
            User usernameExisted = userRepository.findByUsername(user.getUsername());

            if (existingUser != null) {
                // Validate and update each field individually
                if (user.getProfilePic() != null) {
                    existingUser.setProfilePic(user.getProfilePic());
                }
                if (user.getFirstName() != null && !user.getFirstName().isEmpty()) {
                    existingUser.setFirstName(user.getFirstName());
                }
                if (user.getLastName() != null && !user.getLastName().isEmpty()) {
                    existingUser.setLastName(user.getLastName());
                }
                if (user.getDateOfBirth() != null) {
                    Date currentDate = new Date();
                    long ageInMillis = currentDate.getTime() - user.getDateOfBirth().getTime();
                    int age = (int) (ageInMillis / (1000L * 60 * 60 * 24 * 365));
                    if(age < 18){
                        return new ResponseEntity<>("You can't use age under 18 years", HttpStatus.BAD_REQUEST);
                    }
                    existingUser.setDateOfBirth(user.getDateOfBirth());
                }
                if (user.getGender() != null && !user.getGender().isEmpty()) {
                    existingUser.setGender(user.getGender());
                }
                if (user.getUsername() != null && !user.getUsername().isEmpty()) {
                    if (usernameExisted == null || user.getUsername().equals(existingUser.getUsername())) {
                        existingUser.setUsername(user.getUsername());
                    } else {
                        return new ResponseEntity<>("Username already exists, please try a new username",
                                HttpStatus.ACCEPTED);
                    }
                }
                userRepository.save(existingUser);
                return new ResponseEntity<>("Profile updated successfully", HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<List<User>> getUsersByIds(List<String> ids) {
        List<User> users = userRepository.findAllById(ids);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}