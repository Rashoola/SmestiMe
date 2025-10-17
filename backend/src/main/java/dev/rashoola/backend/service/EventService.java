/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.dto.EventDto;
import dev.rashoola.backend.util.Response;
import java.util.List;

/**
 *
 * @author rasul
 */
public interface EventService {
    public Response<Event> save(EventDto event);
    public Response<Event> findById(Long id);
    public Response<Event> findByEntryCode(String entryCode);
    public Response<List<Event>> index();
    public Response<Event> show(Long id);
}
