/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.HallRepository;
import dev.rashoola.backend.service.HallService;
import dev.rashoola.backend.util.Response;
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
    
}
