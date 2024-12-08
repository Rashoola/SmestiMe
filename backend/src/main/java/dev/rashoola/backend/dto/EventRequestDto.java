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
public record EventRequestDto(String name, String description, Long venueId, LocalDate date, List<Long> hallIds) {

}
