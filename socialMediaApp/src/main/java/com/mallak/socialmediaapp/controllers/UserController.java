package com.mallak.socialmediaapp.controllers;

import com.mallak.socialmediaapp.models.User;
import com.mallak.socialmediaapp.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<Optional<User>> getUser(@RequestBody User user){
        return userService.getUserById(user.getId());
    }

    @PutMapping("/editprofile")
    public ResponseEntity<String> editMyProfile(@RequestBody User user){
        return userService.editProfile(user);
    }
}
