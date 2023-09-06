package com.doacha.seesaw.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequest {
    private final String userEmail;

    private final String userPassword;

    private final String userName;

    private final String userNickname;

    private final String userBirth;

    private final boolean userGender;
}
