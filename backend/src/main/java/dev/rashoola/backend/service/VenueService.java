/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.Venue;
import dev.rashoola.backend.util.Response;
import java.util.List;

/**
 *
 * @author rasul
 */
public interface VenueService {
    public Response<Venue> create(Venue venue);
    public Response<List<Venue>> index();
}
