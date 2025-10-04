/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.util.Response;

/**
 *
 * @author rasul
 */
public interface BookingService {
    public Response<Booking> findById(Long id);
}
