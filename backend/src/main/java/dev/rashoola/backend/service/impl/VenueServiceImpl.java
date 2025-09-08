/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.VenueRepository;
import dev.rashoola.backend.service.VenueService;
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
public class VenueServiceImpl implements VenueService{
    
    @Autowired
    private final VenueRepository repository;

    @Override
    public Response<Venue> create(Venue venue) {
        if(repository.existsByName(venue.getName())){
            return new Response<>(ResponseStatus.Conflict, null);
        }
        
        repository.save(venue);
        return new Response<>(ResponseStatus.Ok, venue);
    }

    @Override
    public Response<List<Venue>> index() {
        List<Venue> venues = repository.findAll();
        if(venues == null || venues.size() == 0){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        return new Response<>(ResponseStatus.Ok, venues);
    }

    @Override
    public Response<Venue> findById(Long id) {
        Optional<Venue> venue = repository.findById(id);
        if(venue.isEmpty()){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        return new Response<>(ResponseStatus.Ok, venue.get());
    }

    @Override
    public Response<Venue> update(Venue venue) {
        repository.save(venue);
        return new Response<>(ResponseStatus.Ok, venue);
    }
    
}
