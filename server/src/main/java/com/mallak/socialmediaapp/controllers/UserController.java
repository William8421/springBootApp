package com.mallak.socialmediaapp.controllers;

import com.mallak.socialmediaapp.models.User;
import com.mallak.socialmediaapp.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.102:3000"})
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public ResponseEntity<Optional<User>> getUser(@RequestBody Map<String, String> payload){
        return userService.getUserById(payload.get("id"));
    }

    @PutMapping("/editprofile")
    public ResponseEntity<String> editMyProfile(@RequestBody User user){
        return userService.editProfile(user);
    }
}
