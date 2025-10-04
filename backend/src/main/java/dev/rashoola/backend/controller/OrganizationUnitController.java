/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.controller;

import dev.rashoola.backend.domain.OrganizationUnit;
import dev.rashoola.backend.domain.enums.LocationType;
import dev.rashoola.backend.util.ResponseConverter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.rashoola.backend.service.OrganizationUnitService;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("api/organization-units")
public class OrganizationUnitController {
    
    @Autowired
    private final OrganizationUnitService unitService;
    
    @Autowired
    private final ResponseConverter<String> converter;
    
    @Autowired
    private final ResponseConverter<Boolean> booleanConverter;
    
    @Autowired
    private final ResponseConverter<OrganizationUnit> unitConverter;
    
    @Autowired
    private final ResponseConverter<String> stringConverter;
    
    @PostMapping("/full")
    public ResponseEntity<Boolean> full(@RequestBody OrganizationUnit table){
        return booleanConverter.toResponseEntity(unitService.isFull(table));
    }
    
    @GetMapping("/types")
    public ResponseEntity<List<String>> getUnitTypes(@RequestParam String locationType){
        return stringConverter.toListResponseEntity(unitService.getTypes(LocationType.valueOf(locationType)));
    }
}
