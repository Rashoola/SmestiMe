/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.User;
import dev.rashoola.backend.util.Response;

/**
 *
 * @author rasul
 */
public interface UserService {
    public Response<User> register(User user);
    public Response<User> registerAdmin(User user);
    public Response<User> login(String email, String password);
    public Response<User> findById(Long id);
}
