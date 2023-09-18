package com.doacha.seesawbank.seesawbank.model.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequest {
    private final String memberId;

    private final String memberPassword;

    private final String memberName;

}
