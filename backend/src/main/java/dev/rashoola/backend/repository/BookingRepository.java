/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.domain.Location;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author rasul
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{

    @Query("SELECT b FROM Booking b WHERE b.location = :location AND b.event.date = :date")
    List<Booking> findByLocationAndDate(@Param("location") Location location, @Param("date") LocalDate date);
    
    public void deleteByEvent(Event event);
}
