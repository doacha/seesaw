package com.doacha.seesaw.model.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequest {
    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private final String memberEmail;

    @Schema(description = "사용자 비밀번호", example = "ehfldkflckck", required = true)
    private final String memberPassword;

    @Schema(description = "사용자 이름", example = "도아차", required = true)
    private final String memberName;

    @Schema(description = "사용자 닉네임", example = "차도아", required = true)
    private final String memberNickname;

    @Schema(description = "사용자 생일", example = "19990324", required = true)
    private final String memberBirth;

    @Schema(description = "사용자 성별", example = "true", required = true)
    private final boolean memberGender;
}
