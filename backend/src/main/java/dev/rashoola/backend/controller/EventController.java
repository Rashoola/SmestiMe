/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.dto.EventRequestDto;
import dev.rashoola.backend.service.EventService;
import dev.rashoola.backend.util.ResponseConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api/events")
public class EventController {
    
    @Autowired
    private final EventService eventService;
    
    @Autowired
    private final ResponseConverter<Event> converter;
    
    @PostMapping("/create")
    public ResponseEntity<Event> create(@RequestBody EventRequestDto event){
        return converter.toResponseEntity(eventService.create(event));
    }
    
}
