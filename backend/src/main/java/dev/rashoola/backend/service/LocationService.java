/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.util.Response;
import java.time.LocalDate;
import java.util.List;

/**
 *
 * @author rasul
 */
public interface HallService {
    public Response<Hall> create(Hall hall);
    public Response<List<Hall>> findByVenue(Venue venue);
    public Response<List<Hall>> findByVenueId(Long id);
    public Response<Hall> findById(Long id);
    public Response<List<Hall>> allHallsAreFree(List<Long> hallIds, LocalDate date);
}
