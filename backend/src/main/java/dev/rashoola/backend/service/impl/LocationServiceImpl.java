/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Location;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.domain.enums.LocationType;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.util.Response;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rashoola.backend.repository.LocationRepository;
import dev.rashoola.backend.service.LocationService;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class LocationServiceImpl implements LocationService{
    
    @Autowired
    private final LocationRepository repository;

    @Override
    public Response<List<Location>> findByVenue(Venue venue) {
        Optional<List<Location>> locations = repository.findByVenue(venue);
        if(locations.isEmpty()){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        return new Response<>(ResponseStatus.Ok, locations.get());
    }

    @Override
    public Response<Location> findById(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findById(id).get());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
    }

    @Override
    public Response<List<String>> getTypes() {
        List<String> types = Arrays.stream(LocationType.values())
                               .map(Enum::name)
                               .collect(Collectors.toList());
        
        return new Response<>(ResponseStatus.Ok, types);
    }

    @Override
    public Response<List<Location>> findAvailable(Long venueId, LocalDate date) {
        return new Response<>(ResponseStatus.Ok, repository.findAvailableLocationsByVenueAndDate(venueId, date));
    }
    
}
