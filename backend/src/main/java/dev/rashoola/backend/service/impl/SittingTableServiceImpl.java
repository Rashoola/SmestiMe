/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.SittingTable;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.repository.SittingTableRepository;
import dev.rashoola.backend.service.SittingTableService;
import dev.rashoola.backend.util.Response;
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

    @Override
    public Response<String> create(List<SittingTable> sittingTables) {
        for(SittingTable sittingTable : sittingTables){
        if(repository.existsByHallAndName(sittingTable.getHall(), sittingTable.getName())){
            return new Response<>(ResponseStatus.Conflict, "The already is a table with the name in the given hall.");
        }
        }
        
        repository.saveAll(sittingTables);
        return new Response<>(ResponseStatus.Ok, "The table has been successfully saved.");
    }
    
}
