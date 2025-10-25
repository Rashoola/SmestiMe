/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.OrganizationUnit;
import dev.rashoola.backend.domain.enums.LocationType;
import dev.rashoola.backend.domain.enums.UnitType;
import dev.rashoola.backend.enums.ResponseStatus;
import dev.rashoola.backend.util.Response;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rashoola.backend.repository.OrganizationUnitRepository;
import dev.rashoola.backend.service.OrganizationUnitService;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class OrganizationUnitServiceImpl implements OrganizationUnitService {

    @Autowired
    private final OrganizationUnitRepository repository;

    @Override
    public Response<List<String>> getTypes(LocationType locationType) {
        List<String> types = switch (locationType) {
            case HALL ->
                List.of(UnitType.TABLE.name(), UnitType.ROOM.name());
            case EXCURSION ->
                List.of(UnitType.BUS.name(), UnitType.CAR.name());
        };
        return new Response<>(ResponseStatus.Ok, types);
    }

    @Override
    public Response<OrganizationUnit> findById(Long id) {
        return new Response<>(ResponseStatus.Ok, repository.findById(id).get());
    }

    @Override
    public Response<Boolean> isFull(OrganizationUnit organizationUnit) {
        return new Response<>(ResponseStatus.Ok, repository.isFull(organizationUnit, organizationUnit.getCapacity()));
    }

}
