/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.Participation;
import dev.rashoola.backend.dto.GetWaitingParticipationsDto;
import dev.rashoola.backend.dto.ParticipationCreationDto;
import dev.rashoola.backend.dto.TableAssignmentDto;
import dev.rashoola.backend.dto.UserParticipationDto;
import dev.rashoola.backend.service.ParticipationService;
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
    
    @Autowired
    private final ResponseConverter<String> stringConverter;
    
    @Autowired
    private final ResponseConverter<UserParticipationDto> dtoConverter;
    
    @PostMapping("/create")
    public ResponseEntity<Participation> create(@RequestBody ParticipationCreationDto dto){
        return converter.toResponseEntity(participationService.create(dto));
    }
    
    @PostMapping("/assign-table")
    public ResponseEntity<String> assignTable(@RequestBody TableAssignmentDto dto){
        System.out.println("Pozvano smestanje na sto. ParticipationId: " + dto.participationId() + ", TableId: " + dto.sittingTableId());
        return stringConverter.toResponseEntity(participationService.assignTable(dto));
    }
    
    @GetMapping("/event/{eventId}/waiting")
    public ResponseEntity<List<Participation>> getWaitingParticipations(@PathVariable Long eventId){
        return converter.toListResponseEntity(participationService.getWaitingParticipations(eventId));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserParticipationDto>> getParticipationsByUser(@PathVariable Long userId){
        return dtoConverter.toListResponseEntity(participationService.getParticipationsByUser(userId));
    }
}
