/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.Location;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.domain.enums.LocationType;
import dev.rashoola.backend.util.Response;
import java.time.LocalDate;
import java.util.List;

/**
 *
 * @author rasul
 */
public interface LocationService {
    public Response<Location> create(Location hall);
    public Response<List<Location>> findByVenue(Venue venue);
    public Response<List<Location>> findByVenueId(Long id);
    public Response<Location> findById(Long id);
    public Response<List<Location>> allFree(List<Long> hallIds, LocalDate date);
    public Response<List<Location>> findAvailable(Long venueId, LocalDate date);
    public Response<List<String>> getTypes();
}
