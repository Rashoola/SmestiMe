/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.util;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 *
 * @author rasul
 */
@Component
public class ResponseConverter<T> {
    public ResponseEntity<T> toResponseEntity(Response<T> response) {
        ResponseEntity<T> e = ResponseEntity.status(response.getStatus().getCode()).body(response.getData());
        System.out.println(e.getBody());
        return ResponseEntity.status(response.getStatus().getCode()).body(response.getData());
    }

    public ResponseEntity<List<T>> toListResponseEntity(Response<List<T>> response) {
        return ResponseEntity.status(response.getStatus().getCode()).body(response.getData());
    }
}
