/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.dto.EventRequestDto;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.EventRepository;
import dev.rashoola.backend.service.BookingService;
import dev.rashoola.backend.service.EventService;
import dev.rashoola.backend.service.HallService;
import dev.rashoola.backend.service.VenueService;
import dev.rashoola.backend.util.Response;
import java.time.LocalDate;
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
public class EventServiceImpl implements EventService{
    
    @Autowired
    private final EventRepository repository;
    
    @Autowired
    private final HallService hallService;
    
    @Autowired
    private final VenueService venueService;
    
    @Autowired
    private final BookingService bookingService;

    @Override
    public Response<Event> create(EventRequestDto event) {

        Venue venue = null;
        List<Hall> halls = null;

        Response<Venue> venueResponse = venueService.findById(event.venueId());
        if (venueResponse.getStatus() == ResponseStatus.Ok) {
            venue = venueResponse.getData();
        }

        Response<List<Hall>> hallsResponse = hallService.allHallsAreFree(event.hallIds(), event.date());

        if (!hallsResponse.getStatus().equals(ResponseStatus.Ok)) {
            return new Response<>(ResponseStatus.Conflict, null);
        }
        
        halls = hallsResponse.getData();
        System.out.println(halls);
        
        Event finalEvent = new Event();
        finalEvent.setName(event.name());
        finalEvent.setDescription(event.description());
        finalEvent.setDate(event.date());
        finalEvent.setVenue(venue);
        Event savedEvent = repository.save(finalEvent);

        bookingService.createBookingsForEvent(savedEvent, halls);

        return new Response<>(ResponseStatus.Ok, savedEvent);
    }

    @Override
    public Response<String> delete(Event event) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
