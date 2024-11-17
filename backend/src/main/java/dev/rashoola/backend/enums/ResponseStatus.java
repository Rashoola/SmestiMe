/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Enum.java to edit this template
 */
package dev.rashoola.backend.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 *
 * @author rasul
 */
@Getter
@RequiredArgsConstructor
public enum ResponseStatus {
    Ok(200),
    Created(201),
    NoContent(204),
    BadRequest(400),
    Unauthorized(401),
    Forbidden(403),
    NotFound(404),
    Conflict(409),
    InternalServerError(500);
    
    private final int code;
}
