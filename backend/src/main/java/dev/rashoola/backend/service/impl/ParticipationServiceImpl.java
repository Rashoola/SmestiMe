/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.domain.Participation;
import dev.rashoola.backend.domain.OrganizationUnit;
import dev.rashoola.backend.domain.User;
import dev.rashoola.backend.dto.ParticipationCreationDto;
import dev.rashoola.backend.dto.OrganizationUnitAssignmentDto;
import dev.rashoola.backend.dto.OrganizationUnitCreationDto.OrganizationUnitDto;
import dev.rashoola.backend.dto.UserParticipationDto;
import dev.rashoola.backend.dto.UserParticipationDto.EventDto;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.ParticipationRepository;
import dev.rashoola.backend.service.EventService;
import dev.rashoola.backend.service.ParticipationService;
import dev.rashoola.backend.service.UserService;
import dev.rashoola.backend.util.Response;
import java.util.LinkedList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rashoola.backend.service.OrganizationUnitService;

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
    
    @Autowired
    private final OrganizationUnitService sittingTableService;

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
        
        if((!dto.entryCode().equals(event.getEntryCode())) & (event.getEntryCode() != null)){
            return new Response<>(ResponseStatus.Unauthorized, null);
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

    @Override
    public Response<String> assignOrganizationUnit(OrganizationUnitAssignmentDto dto) {
        Participation participation = null;
        try{
            participation = repository.findById(dto.participationId()).get();
            System.out.println(participation.getId());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, "Participation not found.");
        }
        
        OrganizationUnit table = null;
        try{
           Response<OrganizationUnit> tableResponse = sittingTableService.findById(dto.organizationUnitId());
           if(!tableResponse.getStatus().equals(ResponseStatus.Ok)){
               return new Response<>(ResponseStatus.NotFound, "Sitting table not found.");
           }
           
           table = tableResponse.getData();
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, "Sitting table not found.");
        }
        
        Response<Boolean> fullnessResponse = sittingTableService.isFull(table);
        Boolean isFull = fullnessResponse.getData();
        if(isFull){
            return new Response<>(ResponseStatus.Forbidden, "Sitting table is full.");
        }
        
        System.out.println("TableId: " + table.getId() + ", Table name: " + table.getName());
        participation.setOrganizationUnit(table);
        
        try{
            repository.save(participation);
            return new Response<>(ResponseStatus.Ok, "The participation has been modified.");
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, "An error ocurred during changing the participation.");
        }
    }

    @Override
    public Response<List<Participation>> getWaitingParticipations(Long eventId) {
        
        Response<Event> eventResponse = eventService.findById(eventId);
        
        if(!eventResponse.getStatus().equals(ResponseStatus.Ok)){
            System.out.println("Event nije pronadjen.");
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        Event event = eventResponse.getData();
        
        List<Participation> participations = repository.findByEvent(event);
        List<Participation> waitingParticipations = new LinkedList<>();
        
        if(participations == null || participations.isEmpty()){
            System.out.println("Participacije nisu pronadjene.");
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        for(Participation p : participations){
            if(p.getOrganizationUnit() == null){
                waitingParticipations.add(p);
            }
        }
        
        return new Response<>(ResponseStatus.Ok, waitingParticipations);
    }

    @Override
    public Response<List<Participation>> getParticipationsByOrganizationUnit(Long sittingTableId) {
        Response<OrganizationUnit> tableResponse = sittingTableService.findById(sittingTableId);
        
        if(!tableResponse.getStatus().equals(ResponseStatus.Ok)){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        OrganizationUnit table = tableResponse.getData();
        
        List<Participation> participations = repository.findByOrganizationUnit(table);
        
        return new Response<>(ResponseStatus.Ok, participations);
    }

    @Override
    public Response<List<UserParticipationDto>> getParticipationsByUser(Long userId) {
        Response<User> userResponse = userService.findById(userId);
        
        if(!userResponse.getStatus().equals(ResponseStatus.Ok)){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        User user = userResponse.getData();
        
        List<Participation> participations = repository.findByUser(user);
        List<UserParticipationDto> dtos = new LinkedList<>();
        
        for (Participation p : participations){
            EventDto eventDto = new EventDto(p.getEvent().getId(), p.getEvent().getName());
            
            OrganizationUnitDto tableDto = null;
            
            if(p.getOrganizationUnit() == null){
                tableDto = new OrganizationUnitDto(0L, "None", 0);
            }
            else {
             tableDto = new OrganizationUnitDto(p.getOrganizationUnit().getId(), p.getOrganizationUnit().getName(), p.getOrganizationUnit().getCapacity());
            }
            UserParticipationDto dto = new UserParticipationDto(p.getId(), eventDto, tableDto);
            
            dtos.add(dto);
        }
        
        return new Response<>(ResponseStatus.Ok, dtos);
    }

    @Override
    public Response<Boolean> hasASeat(Long participationId) {
        Participation participation = null;
        
        try{
            participation = repository.findById(participationId).get();
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        if(participation.getOrganizationUnit() == null){
            return new Response<>(ResponseStatus.Ok, false);
        }
        
        return new Response<>(ResponseStatus.Ok, true);
    }
    
}
