/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.OrganizationUnit;
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
public interface OrganizationUnitRepository extends JpaRepository<OrganizationUnit, Long>{
     @Query("SELECT CASE WHEN COUNT(p) >= :capacity THEN TRUE ELSE FALSE END " +
       "FROM Participation p WHERE p.organizationUnit = :organizationUnit")
    Boolean isFull(@Param("organizationUnit") OrganizationUnit organizationUnit, 
               @Param("capacity") int capacity);
    
    public List<OrganizationUnit> findByBooking(Booking booking);

}
