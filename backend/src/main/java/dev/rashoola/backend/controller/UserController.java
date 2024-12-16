/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.User;
import dev.rashoola.backend.dto.UserLoginDto;
import dev.rashoola.backend.service.UserService;
import dev.rashoola.backend.util.ResponseConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private final UserService userService;
    
    @Autowired
    private final ResponseConverter<User> converter;
    
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){
        return converter.toResponseEntity(userService.register(user));
    }
    
    @PostMapping("/register-admin")
    public ResponseEntity<User> registerAdmin(@RequestBody User user){
        return converter.toResponseEntity(userService.registerAdmin(user));
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserLoginDto dto){
        return converter.toResponseEntity(userService.login(dto.email(),dto.password()));
    }
}
