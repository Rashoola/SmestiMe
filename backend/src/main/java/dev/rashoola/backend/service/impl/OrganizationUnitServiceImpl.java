/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.SittingTable;
import dev.rashoola.backend.dto.SittingTableCreationDto;
import dev.rashoola.backend.dto.SittingTableCreationDto.SittingTableDto;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.SittingTableRepository;
import dev.rashoola.backend.service.BookingService;
import dev.rashoola.backend.service.SittingTableService;
import dev.rashoola.backend.util.Response;
import java.util.LinkedList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class SittingTableServiceImpl implements SittingTableService{
    
    @Autowired
    private final SittingTableRepository repository;
    
    @Autowired BookingService bookingService;

    @Override
    public Response<String> create(SittingTableCreationDto dto) {
        Response<Booking> bookingResponse = bookingService.findById(dto.bookingId());
        
        if(!bookingResponse.getStatus().equals(ResponseStatus.Ok)){
            return new Response<>(ResponseStatus.NotFound, "There's no booking for these tables");
        }
        
        Booking booking = bookingResponse.getData();
        List<SittingTable> tables = new LinkedList<>();
        
        for(SittingTableDto table : dto.tables()){
            SittingTable st = new SittingTable();
            st.setBooking(booking);
            st.setName(table.name());
            st.setNumberOfSeats(table.numberOfSeats());
            
            tables.add(st);
        }
        
        try{
            repository.saveAll(tables);
            return new Response<>(ResponseStatus.Ok, "All the tables have been saved.");
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, "An error during saving of the tables.");
        }
    }

    @Override
    public Response<SittingTable> findById(Long id) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.findById(id).get());
        } catch(Exception ex){
            return new Response<>(ResponseStatus.NotFound, null);
        }
    }

    @Override
    public Response<Boolean> isFull(SittingTable sittingTable) {
        try{
            return new Response<>(ResponseStatus.Ok, repository.isFull(sittingTable, sittingTable.getNumberOfSeats()));
        } catch(Exception ex){
            return new Response<>(ResponseStatus.InternalServerError, null);
        }
    }

    @Override
    public Response<List<SittingTable>> findByBookingId(Long bookingId) {
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
