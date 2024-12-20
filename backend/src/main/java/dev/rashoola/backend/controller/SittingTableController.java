/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.SittingTable;
import dev.rashoola.backend.dto.SittingTableCreationDto;
import dev.rashoola.backend.service.SittingTableService;
import dev.rashoola.backend.util.ResponseConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("api/tables")
public class SittingTableController {
    
    @Autowired
    private final SittingTableService sittingTableService;
    
    @Autowired
    private final ResponseConverter<String> converter;
    
    @Autowired
    private final ResponseConverter<Boolean> booleanConverter;
    
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody SittingTableCreationDto dto){
        return converter.toResponseEntity(sittingTableService.create(dto));
    }
    
    @PostMapping("/full")
    public ResponseEntity<Boolean> full(@RequestBody SittingTable table){
        return booleanConverter.toResponseEntity(sittingTableService.isFull(table));
    }
}
