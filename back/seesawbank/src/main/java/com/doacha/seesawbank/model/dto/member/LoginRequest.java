package com.doacha.seesawbank.model.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginRequest {
    private final String memberId;

    private final String memberPassword;
}
