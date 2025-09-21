/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.Event;
import java.time.LocalDate;
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
public interface EventRepository extends JpaRepository<Event, Long>{
    public boolean existsByName(String name);
    public boolean existsByDate(LocalDate date);
    public boolean existsByEntryCode(String entryCode);
    
    public Optional<Event> findByEntryCode(String entryCode);
    
    @Query("SELECT b.event FROM Booking b WHERE b = :booking")
    Event findByBooking(@Param("booking") Booking booking);
}
