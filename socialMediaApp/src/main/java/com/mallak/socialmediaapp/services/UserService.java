package com.mallak.socialmediaapp.services;

import com.mallak.socialmediaapp.models.User;
import com.mallak.socialmediaapp.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
            System.out.println(id);
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
               String[] fieldsToUpdate = { "profilePic", "firstName", "lastName", "username", "age", "gender" };
               for (String field : fieldsToUpdate) {
                   switch (field) {
                       case "profilePic" -> {
                           if (user.getProfilePic() != null) {
                               existingUser.setProfilePic(user.getProfilePic());
                           }
                       }
                       case "firstName" -> {
                           if (user.getFirstName() != null) {
                               existingUser.setFirstName(user.getFirstName());
                           }
                       }
                       case "lastName" -> {
                           if (user.getLastName() != null) {
                               existingUser.setLastName(user.getLastName());
                           }
                       }
                       case "username" -> {
                           if (user.getUsername() != null) {
                               if (usernameExisted == null) {
                                   existingUser.setUsername(user.getUsername());
                               } else {
                                   return new ResponseEntity<>("Username already exists, please try a new username",
                                           HttpStatus.ACCEPTED);
                               }
                           }
                       }
                       case "age" -> {
                           if (user.getAge() != null) {
                               existingUser.setAge(user.getAge());
                           }
                       }
                       case "gender" -> {
                           if (user.getGender() != null) {
                               existingUser.setGender(user.getGender());
                           }
                       }
                       default -> throw new IllegalStateException("Unexpected value: " + field);
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
}