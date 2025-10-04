/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.OrganizationUnit;
import dev.rashoola.backend.domain.enums.LocationType;
import dev.rashoola.backend.util.Response;
import java.util.List;

/**
 *
 * @author rasul
 */
public interface OrganizationUnitService {
    public Response<OrganizationUnit> findById(Long id);
    public Response<Boolean> isFull(OrganizationUnit organizationUnit);
    public Response<List<String>> getTypes(LocationType locationType);
}
