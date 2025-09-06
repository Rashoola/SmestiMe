/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.OrganizationUnit;
import dev.rashoola.backend.domain.enums.UnitType;
import dev.rashoola.backend.dto.OrganizationUnitCreationDto;
import dev.rashoola.backend.dto.OrganizationUnitCreationDto.OrganizationUnitDto;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.service.BookingService;
import dev.rashoola.backend.util.Response;
import java.util.LinkedList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rashoola.backend.repository.OrganizationUnitRepository;
import dev.rashoola.backend.service.OrganizationUnitService;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class OrganizationUnitServiceImpl implements OrganizationUnitService{
    
    @Autowired
    private final OrganizationUnitRepository repository;
    
    @Autowired BookingService bookingService;

    @Override
    public Response<String> create(OrganizationUnitCreationDto dto) {
        Response<Booking> bookingResponse = bookingService.findById(dto.bookingId());
        
        if(!bookingResponse.getStatus().equals(ResponseStatus.Ok)){
            return new Response<>(ResponseStatus.NotFound, "There's no booking for these tables");
        }
        
        Booking booking = bookingResponse.getData();
        List<OrganizationUnit> units = new LinkedList<>();
        
        for(OrganizationUnitDto unit : dto.units()){
            OrganizationUnit ou = new OrganizationUnit();
            ou.setBooking(booking);
            ou.setName(unit.name());
            ou.setCapacity(unit.capacity());
            ou.setUnitType(UnitType.valueOf(unit.unitType()));
            
            units.add(ou);
        }
        
        try{
            repository.saveAll(units);
            return new Response<>(ResponseStatus.Ok, "All the tables have been saved.");
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, "An error during saving of the tables.");
        }
    }

    @Override
    public Response<OrganizationUnit> findById(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findById(id).get());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
    }

    @Override
    public Response<Boolean> isFull(OrganizationUnit sittingTable) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.isFull(sittingTable, sittingTable.getCapacity()));
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, null);
        }
    }

    @Override
    public Response<List<OrganizationUnit>> findByBookingId(Long bookingId) {
        Response<Booking> bookingResponse = bookingService.findById(bookingId);
        
        if(!bookingResponse.getStatus().equals(ResponseStatus.Ok)){
            return new Response<>(ResponseStatus.NotFound, null);
        }
        
        Booking booking = bookingResponse.getData();
        
        try{
            return new Response<>(ResponseStatus.Ok, repository.findByBooking(booking));
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
    }
    
}
