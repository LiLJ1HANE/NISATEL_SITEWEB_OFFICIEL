package com.nisatel.controller;

import com.nisatel.model.*;
import com.nisatel.repository.UserRepository;
import com.nisatel.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepo, BCryptPasswordEncoder encoder, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {
        if (userRepo.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists";
        }
        User u = new User();
        u.setUsername(request.getUsername());
        u.setPasswordHash(encoder.encode(request.getPassword()));
        u.setRole(User.Role.ADMIN); // changer selon besoin
        userRepo.save(u);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) {
        User user = userRepo.findByUsername(request.getUsername()).orElseThrow();
        if (encoder.matches(request.getPassword(), user.getPasswordHash())) {
            return jwtUtil.generateToken(user.getUsername());
        }
        return "Invalid credentials";
    }
}
