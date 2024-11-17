/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import dev.rashoola.backend.enums.ResponseStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;


/**
 *
 * @author rasul
 */
@Component
@Getter
@Setter
@NoArgsConstructor
@JsonSerialize
public class Response<T> {
    @JsonProperty
    private T data;
    private ResponseStatus status;
    
    public Response(ResponseStatus status) {
        this.status = status;
    }

    public Response(ResponseStatus status, T data) {
        this.data = data;
        this.status = status;
    }
    
}
