package com.mallak.springbootapp.controllers;
import com.mallak.springbootapp.models.User;
import com.mallak.springbootapp.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.104:3000"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        return authService.registerUser(user);

    }

    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody User user) {
        return authService.authenticateUser(user.getEmail(), user.getPassword());
    }

    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser() {
        User currentUser = authService.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.ok(currentUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
