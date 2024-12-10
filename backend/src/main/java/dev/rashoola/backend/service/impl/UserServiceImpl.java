/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.User;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.UserRepository;
import dev.rashoola.backend.service.UserService;
import dev.rashoola.backend.util.Response;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
    private UserRepository repository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Response<User> register(User user) {
        if(repository.existsByEmail(user.getEmail())){
            System.out.println("The user with this email already exists.");
            return new Response<>(ResponseStatus.Conflict, user);
        }
        
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        
        repository.save(user);
        return new Response<>(ResponseStatus.Ok, user);
    }

    @Override
    public Response<User> login(String email, String password) {
        Optional<User> user = repository.findByEmail(email);
        if(user.isEmpty()){
            System.out.println("The user with this email does not exist.");
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        if(!passwordEncoder.matches(password, user.get().getPassword())){
            System.out.println("The password is incorrect.");
            return new Response<>(ResponseStatus.Unauthorized, null);
        }
        
        System.out.println("Successfull login.");
        return new Response<>(ResponseStatus.Ok, user.get());
    }

    @Override
    public Response<User> findById(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findById(id).get());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
    }
    
}
