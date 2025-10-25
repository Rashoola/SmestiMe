/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.Participation;
import dev.rashoola.backend.dto.ParticipationCreationDto;
import dev.rashoola.backend.dto.OrganizationUnitAssignmentDto;
import dev.rashoola.backend.util.Response;
import java.util.List;

/**
 *
 * @author rasul
 */
public interface ParticipationService {
    public Response<Participation> create(ParticipationCreationDto dto);
    public Response<Participation> findById(Long id);
    public Response<String> assignOrganizationUnit(OrganizationUnitAssignmentDto dto);
    public Response<List<Participation>> getWaitingParticipations(Long eventId);
    public Response<List<Participation>> getParticipationsByOrganizationUnit(Long sittingTableId);
    public Response<List<Participation>> getParticipationsByUser(Long userId);
    public Response<Boolean> hasASeat(Long participationId);
}
