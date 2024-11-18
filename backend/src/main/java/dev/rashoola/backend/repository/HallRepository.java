/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.Venue;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author rasul
 */
public interface HallRepository extends JpaRepository<Hall, Long>{
    public Optional<List<Hall>> findByVenue(Venue venue);
    public boolean existsByVenueAndName(Venue venue, String name);
}
