/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.BookingRepository;
import dev.rashoola.backend.service.BookingService;
import dev.rashoola.backend.util.Response;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author rasul
 */
@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{
    
    @Autowired
    private final BookingRepository repository;

    @Override
    public Response<String> createBookingsForEvent(Event event, List<Hall> halls) {
        for (Hall hall : halls) {
            Booking booking = new Booking();
            booking.setEvent(event);
            booking.setHall(hall);
            repository.save(booking);
        }
        
        return new Response<>(ResponseStatus.Ok, "The bookings have been saved.");
    }
    
    
}
