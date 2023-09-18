package com.doacha.seesawbank.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequest {
    private final String memberEmail;

    private final String memberPassword;

    private final String memberName;

    private final String memberNickname;

    private final String memberBirth;

    private final boolean memberGender;
}
