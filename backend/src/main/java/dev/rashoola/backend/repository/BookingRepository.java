/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.Hall;
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
    /*@Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.hall = :hall AND b.event.date = :date")
    boolean existsByHallAndDate(@Param("hall") Hall hall, @Param("date") LocalDate date);*/
    @Query("SELECT b FROM Booking b WHERE b.hall = :hall AND b.event.date = :date")
    List<Booking> findByHallAndDate(@Param("hall") Hall hall, @Param("date") LocalDate date);
}
