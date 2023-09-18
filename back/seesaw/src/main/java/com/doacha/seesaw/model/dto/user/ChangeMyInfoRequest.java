package com.doacha.seesaw.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChangeMyInfoRequest {
    private final String memberEmail;

    private final String memberPassword;

    private final String memberNewPassword;

    private final String memberName;

    private final String memberNickname;

    private final String memberBirth;

    private final boolean memberGender;

    private final String memberImgUrl;

    private final String memberPhoneNumber;
}
