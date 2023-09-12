package com.doacha.seesaw.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginRequest {
    private final String memberEmail;

    private final String memberPassword;
}
