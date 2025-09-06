/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Record.java to edit this template
 */
package dev.rashoola.backend.dto;

import java.util.List;

/**
 *
 * @author rasul
 */
public record OrganizationUnitCreationDto(Long bookingId, List<OrganizationUnitDto> units) {
    public static record OrganizationUnitDto(Long id, String name, int capacity, String unitType){
    }
}
