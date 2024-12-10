/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.SittingTable;
import dev.rashoola.backend.dto.SittingTableCreationDto;
import dev.rashoola.backend.dto.SittingTableCreationDto.SittingTableDto;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.SittingTableRepository;
import dev.rashoola.backend.service.HallService;
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
    
    @Autowired
    private final HallService hallService;

    @Override
    public Response<String> create(SittingTableCreationDto dto) {
        Response<Hall> hallResponse = hallService.findById(dto.hallId());
        
        if(!hallResponse.getStatus().equals(ResponseStatus.Ok)){
            return new Response<>(ResponseStatus.InternalServerError, "The hall was not found");
        }
        
        Hall hall = hallResponse.getData();
        List<SittingTable> sittingTables = new LinkedList<>();
        for(SittingTableDto stdto : dto.sittingTables()){
            SittingTable sittingTable = new SittingTable();
            sittingTable.setHall(hall);
            sittingTable.setName(stdto.name());
            sittingTable.setNumberOfSeats(stdto.numberOfSeats());
            
            sittingTables.add(sittingTable);
        }
        
        repository.saveAll(sittingTables);
        return new Response<>(ResponseStatus.Ok, "The tables have been saved.");
    }
    
}
