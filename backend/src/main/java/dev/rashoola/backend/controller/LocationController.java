/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.Location;
import dev.rashoola.backend.service.LocationService;
import dev.rashoola.backend.util.ResponseConverter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/locations")
public class LocationController {
    @Autowired
    private final LocationService locationService;
    
    @Autowired
    private final ResponseConverter<String> stringConverter;
    
    @Autowired
    private final ResponseConverter<Location> locationConverter;
    
     @GetMapping("/types")
    public ResponseEntity<List<String>> getLocationTypes(){
        return stringConverter.toListResponseEntity(locationService.getTypes());
    }
    
    @GetMapping("/venue/{venueId}/available")
    public ResponseEntity<List<Location>> getAvailableLocations(@PathVariable Long venueId, @RequestParam String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return locationConverter.toListResponseEntity(locationService.findAvailable(venueId, localDate));
    }
}
