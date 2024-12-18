/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Hall;
import dev.rashoola.backend.domain.SittingTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author rasul
 */
@Repository
public interface SittingTableRepository extends JpaRepository<SittingTable, Long>{
     @Query("SELECT CASE WHEN COUNT(p) >= :numberOfSeats THEN TRUE ELSE FALSE END " +
       "FROM Participation p WHERE p.sittingTable = :sittingTable")
    Boolean isFull(@Param("sittingTable") SittingTable sittingTable, 
               @Param("numberOfSeats") int numberOfSeats);

}
