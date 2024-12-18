/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Record.java to edit this template
 */
package dev.rashoola.backend.dto;

import dev.rashoola.backend.dto.SittingTableCreationDto.SittingTableDto;

/**
 *
 * @author rasul
 */
public record UserParticipationDto(Long id, EventDto event, SittingTableDto table) {
    public static record EventDto(Long id, String name){
        }
}
