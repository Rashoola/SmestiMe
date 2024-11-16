/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author rasul
 */
public interface BookingRepository extends JpaRepository<Booking, Long>{
    
}
