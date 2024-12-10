/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.Participation;
import dev.rashoola.backend.dto.ParticipationCreationDto;
import dev.rashoola.backend.util.Response;

/**
 *
 * @author rasul
 */
public interface ParticipationService {
    public Response<Participation> create(ParticipationCreationDto dto);
}
