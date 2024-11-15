/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backendapp.domain.embedded;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author rasul
 */
@Embeddable
public class BookingId implements Serializable{
    private Long eventId;
    private Long hallId;

    public BookingId() {
    }

    public BookingId(Long eventId, Long hallId) {
        this.eventId = eventId;
        this.hallId = hallId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Long getHallId() {
        return hallId;
    }

    public void setHallId(Long hallId) {
        this.hallId = hallId;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 11 * hash + Objects.hashCode(this.eventId);
        hash = 11 * hash + Objects.hashCode(this.hallId);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final BookingId other = (BookingId) obj;
        if (!Objects.equals(this.eventId, other.eventId)) {
            return false;
        }
        return Objects.equals(this.hallId, other.hallId);
    }
    
    
}
