package com.devweb.project.resources;

import io.jsonwebtoken.Claims;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devweb.project.entities.LoginRequest;
import com.devweb.project.entities.User;
import com.devweb.project.repositories.UserRepository;
import com.devweb.project.services.JwtAuthService;

@RestController
@RequestMapping("/auth")
public class AuthResources {

    private final JwtAuthService jwtService;

    @Autowired
    private UserRepository userRepository;

    public AuthResources(JwtAuthService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        if (isValidUser(request.getEmail(), request.getPassword())) {
            String token = jwtService.generateToken(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/secure-resource")
    public ResponseEntity<String> secureResource(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");

        Claims claims = jwtService.verifyToken(token);
        if (claims != null) {
            String email = claims.get("email", String.class);
            return ResponseEntity.ok("Recurso seguro acessado por: " + email);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private boolean isValidUser(String email, String password) {
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        return user.isPresent();
    }
}