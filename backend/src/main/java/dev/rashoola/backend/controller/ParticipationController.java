/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.Participation;
import dev.rashoola.backend.dto.ParticipationCreationDto;
import dev.rashoola.backend.service.ParticipationService;
import dev.rashoola.backend.util.ResponseConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/participations")
public class ParticipationController {
    
    @Autowired
    private final ParticipationService participationService;
    
    @Autowired
    private final ResponseConverter<Participation> converter;
    
    @PostMapping("/create")
    public ResponseEntity<Participation> create(@RequestBody ParticipationCreationDto dto){
        return converter.toResponseEntity(participationService.create(dto));
    }
}
