/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.Venue;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author rasul
 */
@Repository
public interface HallRepository extends JpaRepository<Hall, Long>{
    public Optional<List<Hall>> findByVenue(Venue venue);
    public boolean existsByVenueAndName(Venue venue, String name);
    
    @Query("SELECT h FROM Hall h WHERE h.id IN :ids")
    public List<Hall> findHallsByIds(@Param("ids") List<Long> ids);
    
   /*@Query("SELECT CASE WHEN COUNT(h) = 0 THEN true ELSE false END " +
       "FROM Hall h WHERE h = :hall AND :date NOT IN " +
       "(SELECT e.date FROM Booking b JOIN b.event e WHERE b.hall = h)")
    boolean isFreeOnDate(@Param("hall") Hall hall, @Param("date") LocalDate date);*/
}
