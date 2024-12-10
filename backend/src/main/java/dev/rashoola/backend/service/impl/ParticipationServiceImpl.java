/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.domain.Participation;
import dev.rashoola.backend.domain.User;
import dev.rashoola.backend.dto.ParticipationCreationDto;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.ParticipationRepository;
import dev.rashoola.backend.service.EventService;
import dev.rashoola.backend.service.ParticipationService;
import dev.rashoola.backend.service.UserService;
import dev.rashoola.backend.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class ParticipationServiceImpl implements ParticipationService{
    
    @Autowired
    private final ParticipationRepository repository;
    
    @Autowired
    private final UserService userService;
    
    @Autowired
    private final EventService eventService;

    @Override
    public Response<Participation> create(ParticipationCreationDto dto) {
        Response<User> userResponse = userService.findById(dto.userId());
        Response<Event> eventResponse = eventService.findById(dto.eventId());
        
        if(!(userResponse.getStatus().equals(ResponseStatus.Ok) && eventResponse.getStatus().equals(ResponseStatus.Ok))){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        User user = userResponse.getData();
        Event event = eventResponse.getData();
        
        if(repository.existsByUserAndEvent(user, event)){
            return new Response<>(ResponseStatus.Conflict, null);
        }
        
        Participation participation = new Participation();
        participation.setUser(user);
        participation.setEvent(event);
        
        try{
            Participation savedParticipation = repository.save(participation);
            return new Response<>(ResponseStatus.Ok, savedParticipation);
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, null);
        }
    }
    
}
