/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.domain.Location;
import dev.rashoola.backend.domain.OrganizationUnit;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.domain.enums.UnitType;
import dev.rashoola.backend.dto.EventRequestDto;
import dev.rashoola.backend.dto.EventRequestDto.BookingDto;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.EventRepository;
import dev.rashoola.backend.service.BookingService;
import dev.rashoola.backend.service.EventService;
import dev.rashoola.backend.service.ParticipationService;
import dev.rashoola.backend.service.VenueService;
import dev.rashoola.backend.util.Response;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rashoola.backend.service.LocationService;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;

/**
 *
 * @author rasul
 */
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService{
    
    @Autowired
    private final EventRepository repository;
    
    @Autowired
    private final LocationService locationService;
    
    @Autowired
    private final VenueService venueService;
    
    @Autowired
    private final BookingService bookingService;

    @Transactional
@Override
public Response<Event> create(EventRequestDto dto) {
    try {
        System.out.println("Started saving the event.");
        Event event;

        if (dto.id() != null) {
            event = repository.findById(dto.id())
                    .orElseThrow(() -> new RuntimeException("Event not found"));
            System.out.println("Event is an existing one.");
        } else {
            if(repository.existsByName(dto.name())){
                return new Response<>(ResponseStatus.Conflict, null);
            }
            event = new Event();
        }

        // Basic fields
        event.setName(dto.name());
        event.setDescription(dto.description());

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        LocalDate date = LocalDate.parse(dto.date(), dtf);
        event.setDate(date);
        event.setEntryCode(dto.entryCode());

        Venue venue = venueService.findById(dto.venueId()).getData();
        if (venue == null) {
            return new Response<>(ResponseStatus.NotFound, null);
        }
        event.setVenue(venue);

        // Clear old bookings if updating
        if (event.getBookedLocations() == null) {
            event.setBookedLocations(new LinkedList<>());
        } else {
            event.getBookedLocations().clear();
        }

        // Map DTO → Bookings
        for (EventRequestDto.BookingDto bookingDto : dto.bookedLocations()) {
            Booking booking = new Booking();

            if (bookingDto.id() != null) {
                booking.setId(bookingDto.id());
            }

            Location location = locationService.findById(bookingDto.locationId()).getData();
            if (location == null) {
                return new Response<>(ResponseStatus.NotFound, null);
            }
            booking.setLocation(location);
            booking.setEvent(event);

            // Units
            List<OrganizationUnit> units = new LinkedList<>();
            for (EventRequestDto.BookingDto.OrganizationUnitDto unitDto : bookingDto.organizationUnits()) {
                OrganizationUnit unit = new OrganizationUnit();

                if (unitDto.id() != null) {
                    unit.setId(unitDto.id());
                }

                unit.setName(unitDto.name());
                unit.setCapacity(unitDto.capacity());
                try {
                    unit.setUnitType(UnitType.valueOf(unitDto.unitType()));
                } catch (IllegalArgumentException e) {
                    return new Response<>(ResponseStatus.BadRequest, null);
                }
                unit.setBooking(booking);

                units.add(unit);
            }

            booking.setOrganizationUnits(units);
            event.getBookedLocations().add(booking);
        }

        Event saved = repository.save(event);
        return new Response<>(ResponseStatus.Ok, saved);

    } catch (Exception e) {
        e.printStackTrace();
        return new Response<>(ResponseStatus.InternalServerError, null);
    }
}


    @Override
    public Response<String> delete(Event event) {
        Response<String> bookingDeletionResponse = bookingService.deleteByEvent(event);
        if(!bookingDeletionResponse.getStatus().equals(ResponseStatus.Ok)){
            return new Response<>(ResponseStatus.InternalServerError, "The booking deletion failed.");
        }
        
        try {
            repository.delete(event);
            return new Response<>(ResponseStatus.Ok, "The event has been deleted.");
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, "An error occured during deletion of the event");
        }
    }

    @Override
    public Response<Event> findById(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findById(id).get());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
    }

    @Override
    public Response<List<Event>> index() {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findAll());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, null);
        }
    }

    @Override
    public Response<Event> show(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findById(id).get());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, null);
        }
    }

    @Override
    public Response<Event> findByEntryCode(String entryCode) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findByEntryCode(entryCode).get());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
    }
}

    

