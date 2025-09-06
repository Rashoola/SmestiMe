/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.Location;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.BookingRepository;
import dev.rashoola.backend.util.Response;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rashoola.backend.repository.LocationRepository;
import dev.rashoola.backend.service.LocationService;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class LocationServiceImpl implements LocationService{
    
    @Autowired
    private final LocationRepository repository;
    
    @Autowired
    private final BookingRepository bookingRepository;

    @Override
    public Response<Location> create(Location location) {
        if(repository.existsByVenueAndName(location.getVenue(), location.getName())){
            return new Response<>(ResponseStatus.Conflict, null);
        }
        
        repository.save(location);
        return new Response<>(ResponseStatus.Ok, location);
    }

    @Override
    public Response<List<Location>> findByVenue(Venue venue) {
        Optional<List<Location>> locations = repository.findByVenue(venue);
        if(locations.isEmpty()){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        return new Response<>(ResponseStatus.Ok, locations.get());
    }

    @Override
    public Response<List<Location>> allFree(List<Long> locationIds, LocalDate date) {
        List<Location> locations = repository.findByIds(locationIds);
        if(locations.isEmpty()){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        for(Location location : locations){
            List<Booking> bookings = bookingRepository.findByLocationAndDate(location, date);
            if(!bookings.isEmpty()){
                return new Response<>(ResponseStatus.Conflict, null);
            }
        }
        return new Response<>(ResponseStatus.Ok, locations);
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
    public Response<List<Location>> findByVenueId(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findByVenueId(id));
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, null);
        }
    }
    
}
