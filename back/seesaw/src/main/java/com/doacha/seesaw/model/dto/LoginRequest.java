package com.doacha.seesaw.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginRequest {
    private final String userEmail;

    private final String userPassword;
}
