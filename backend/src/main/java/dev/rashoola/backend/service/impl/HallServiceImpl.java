/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.BookingRepository;
import dev.rashoola.backend.repository.HallRepository;
import dev.rashoola.backend.service.HallService;
import dev.rashoola.backend.util.Response;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class HallServiceImpl implements HallService{
    
    @Autowired
    private final HallRepository repository;
    
    @Autowired
    private final BookingRepository bookingRepository;

    @Override
    public Response<Hall> create(Hall hall) {
        if(repository.existsByVenueAndName(hall.getVenue(), hall.getName())){
            return new Response<>(ResponseStatus.Conflict, null);
        }
        
        repository.save(hall);
        return new Response<>(ResponseStatus.Ok, hall);
    }

    @Override
    public Response<List<Hall>> findByVenue(Venue venue) {
        Optional<List<Hall>> halls = repository.findByVenue(venue);
        if(halls.isEmpty()){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        return new Response<>(ResponseStatus.Ok, halls.get());
    }

    @Override
    public Response<List<Hall>> allHallsAreFree(List<Long> hallIds, LocalDate date) {
        List<Hall> halls = repository.findHallsByIds(hallIds);
        if(halls.isEmpty()){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        for(Hall hall : halls){
            List<Booking> bookings = bookingRepository.findByHallAndDate(hall, date);
            if(!bookings.isEmpty()){
                return new Response<>(ResponseStatus.Conflict, null);
            }
        }
        return new Response<>(ResponseStatus.Ok, halls);
    }

    @Override
    public Response<Hall> findById(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findById(id).get());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
    }

    @Override
    public Response<List<Hall>> findByVenueId(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findByVenueId(id));
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, null);
        }
    }
    
}
