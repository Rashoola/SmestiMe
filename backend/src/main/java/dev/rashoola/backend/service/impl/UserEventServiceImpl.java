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
        System.out.println("Metoda servisa pozvana");
        Response<List<Event>> eventsResponse = eventService.index();

        if (!eventsResponse.getStatus().equals(ResponseStatus.Ok)) {
            System.out.println("Nema eventova");
            return new Response<>(ResponseStatus.NotFound, null);
        }

        List<Event> events = eventsResponse.getData();

        // Fetch user participations
        Response<List<UserParticipationDto>> participationsResponse = participationService.getParticipationsByUser(userId);
        if (participationsResponse.getStatus() != ResponseStatus.Ok || participationsResponse.getData() == null) {
            System.out.println("Nema participacija");
            return new Response<>(ResponseStatus.NotFound, null);
        }

        // Extract participation event IDs into a Set for efficient lookup
        Set<Long> participationEventIds = participationsResponse.getData().stream()
                .map(participation -> participation.event().id())
                .collect(Collectors.toSet());

        // Filter events based on conditions
        List<Event> filteredEvents = events.stream()
                .filter(event -> !participationEventIds.contains(event.getId()) && event.getDate().isAfter(LocalDate.now()))
                .collect(Collectors.toList());

        return new Response<>(ResponseStatus.Ok, filteredEvents);
    }

}
