/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package dev.rashoola.backend.service;

import dev.rashoola.backend.domain.Booking;
import dev.rashoola.backend.domain.SittingTable;
import dev.rashoola.backend.dto.SittingTableCreationDto;
import dev.rashoola.backend.util.Response;
import java.util.List;

/**
 *
 * @author rasul
 */
public interface SittingTableService {
    public Response<String> create(SittingTableCreationDto dto);
    public Response<SittingTable> findById(Long id);
    public Response<Boolean> isFull(SittingTable sittingTable);
    public Response<List<SittingTable>> findByBookingId(Long bookingId);
}
