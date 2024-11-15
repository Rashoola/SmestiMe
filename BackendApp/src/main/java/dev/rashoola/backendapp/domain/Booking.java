/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backendapp.domain;

import dev.rashoola.backendapp.domain.embedded.BookingId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

/**
 *
 * @author rasul
 */
@Entity
public class Booking {
    @EmbeddedId
    private BookingId id;

    public BookingId getId() {
        return id;
    }

    public void setId(BookingId id) {
        this.id = id;
    }
    
}
