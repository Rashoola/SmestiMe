/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.dto.UserParticipationDto;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.service.EventService;
import dev.rashoola.backend.service.ParticipationService;
import dev.rashoola.backend.service.UserEventService;
import dev.rashoola.backend.util.Response;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class UserEventServiceImpl implements UserEventService{
    
    @Autowired
    private final ParticipationService participationService;
    
    @Autowired
    private final EventService eventService;

    @Override
    public Response<List<Event>> getForParticipants(Long userId) {
       return null;
    }

}
