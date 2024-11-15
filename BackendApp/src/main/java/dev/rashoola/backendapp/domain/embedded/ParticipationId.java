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
public class ParticipationId implements Serializable{
    private Long userId;
    private Long eventId;
    // Default constructor
    public ParticipationId() {}

    public ParticipationId(Long userId, Long eventId) {
        this.userId = userId;
        this.eventId = eventId;
    }

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 59 * hash + Objects.hashCode(this.userId);
        hash = 59 * hash + Objects.hashCode(this.eventId);
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
        final ParticipationId other = (ParticipationId) obj;
        if (!Objects.equals(this.userId, other.userId)) {
            return false;
        }
        return Objects.equals(this.eventId, other.eventId);
    }

   
}
