package com.doacha.seesawbank.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginRequest {
    private final String userId;

    private final String userPassword;
}
