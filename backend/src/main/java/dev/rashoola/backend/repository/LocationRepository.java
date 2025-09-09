/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Location;
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
public interface LocationRepository extends JpaRepository<Location, Long> {

    public Optional<List<Location>> findByVenue(Venue venue);

    public boolean existsByVenueAndName(Venue venue, String name);

    @Query("SELECT l FROM Location l WHERE l.id IN :ids")
    public List<Location> findByIds(@Param("ids") List<Long> ids);

    @Query("SELECT l FROM Location l WHERE l.venue.id = :id")
    public List<Location> findByVenueId(@Param("id") Long venueId);

    @Query("""
    SELECT l FROM Location l
    WHERE l.venue.id = :venueId
      AND NOT EXISTS (
          SELECT b FROM Booking b
          WHERE b.location = l
            AND b.event.date = :date
      )
""")
    List<Location> findAvailableLocationsByVenueAndDate(
            @Param("venueId") Long venueId,
            @Param("date") LocalDate date
    );

}
