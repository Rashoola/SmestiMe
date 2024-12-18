/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.repository;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.Event;
import dev.rashoola.backend.domain.Participation;
import dev.rashoola.backend.domain.SittingTable;
import dev.rashoola.backend.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author rasul
 */
@Repository
public interface ParticipationRepository extends JpaRepository<Participation, Long>{
    public boolean existsByUserAndEvent(User user, Event event);
    public List<Participation> findByEvent(Event event);
    public List<Participation> findBySittingTable(SittingTable sittingTable);
    public List<Participation> findByUser(User user);
}
