/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Record.java to edit this template
 */
package dev.rashoola.backend.dto;

import java.time.LocalDate;
import java.util.List;

/**
 *
 * @author rasul
 */
public record EventRequestDto(Long id, String name, String description, Long venueId, LocalDate date, String entryCode, List<BookingDto> bookings) {
   public static record BookingDto(Long id, Long locationId, List<OrganizationUnitDto> organizationUnits){
       public static record OrganizationUnitDto(Long id, String name, Integer capacity, String unitType){
           
       }
   }
}
