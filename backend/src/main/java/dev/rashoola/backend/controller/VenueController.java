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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.web.bind.annotation.RequestParam;

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
    
    @Autowired
    private final ResponseConverter<String> stringConverter;
    
    @PostMapping("/save")
    public ResponseEntity<Venue> save(@RequestBody Venue venue){
        for(Location location : venue.getLocations()){
            location.setVenue(venue);
        }
        return converter.toResponseEntity(venueService.save(venue));
    }
    
    @GetMapping("")
    public ResponseEntity<List<Venue>> index(){
        return converter.toListResponseEntity(venueService.index());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Venue> show(@PathVariable Long id){
        return converter.toResponseEntity(venueService.findById(id));
    }
    
    @GetMapping("/locations/types")
    public ResponseEntity<List<String>> getLocationTypes(){
        return stringConverter.toListResponseEntity(locationService.getTypes());
    }
    
    @GetMapping("/{id}/locations/available")
    public ResponseEntity<List<Location>> getAvailableLocations(@PathVariable Long id, @RequestParam String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return locationConverter.toListResponseEntity(locationService.findAvailable(id, localDate));
    }
}
