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
        Optional<User> user = userRepository.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public ResponseEntity<String> editProfile(User user) {
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        User usernameExisted = userRepository.findByUsername(user.getUsername());
        if(existingUser != null){
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            if(usernameExisted == null){
                existingUser.setUsername(user.getUsername());
            }else{
                return new ResponseEntity<>("Username already exists, please try a new username", HttpStatus.ACCEPTED);
            }
            existingUser.setAge(user.getAge());
            existingUser.setGender(user.getGender());
            userRepository.save(existingUser);
            return new ResponseEntity<>("Profile updated successfully", HttpStatus.ACCEPTED);
        }else {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
    }
}
