/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.service.HallService;
import dev.rashoola.backend.service.VenueService;
import dev.rashoola.backend.util.ResponseConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    private final HallService hallService;
    
    @Autowired
    private final ResponseConverter<Venue> converter;
    
    @PostMapping("/create")
    public ResponseEntity<Venue> create(@RequestBody Venue venue){
        for(Hall hall : venue.getHalls()){
            hall.setVenue(venue);
        }
        return converter.toResponseEntity(venueService.create(venue));
    }
    
    @GetMapping("")
    public ResponseEntity<List<Venue>> index(){
        return converter.toListResponseEntity(venueService.index());
    }
}
