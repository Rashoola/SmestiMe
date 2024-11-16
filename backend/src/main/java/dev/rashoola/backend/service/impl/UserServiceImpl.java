/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.User;
import dev.rashoola.backend.repository.UserRepository;
import dev.rashoola.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author rasul
 */
@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
    private UserRepository repository;

    @Override
    public void register(User user) {
        if(repository.existsByEmail(user.getEmail())){
            throw new RuntimeException("User with this email already exists");
        }
        
        repository.save(user);
    }

    @Override
    public User login(String email, String password) {
        return null;
    }
    
}
