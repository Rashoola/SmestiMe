/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.Location;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.service.VenueService;
import dev.rashoola.backend.util.ResponseConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.rashoola.backend.service.LocationService;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/venues")
public class VenueController {
    
    @Autowired
    private final VenueService venueService;
    
    @Autowired
    private final LocationService locationService;
    
    @Autowired
    private final ResponseConverter<Venue> converter;
    
    @Autowired
    private final ResponseConverter<Location> locationConverter;
    
    @PostMapping("/create")
    public ResponseEntity<Venue> create(@RequestBody Venue venue){
        for(Location location : venue.getLocations()){
            location.setVenue(venue);
        }
        return converter.toResponseEntity(venueService.create(venue));
    }
    
    @GetMapping("")
    public ResponseEntity<List<Venue>> index(){
        return converter.toListResponseEntity(venueService.index());
    }
    
    @GetMapping("/{id}/locations")
    public ResponseEntity<List<Location>> getHalls(@PathVariable Long id){
        return locationConverter.toListResponseEntity(locationService.findByVenueId(id));
    }
}
