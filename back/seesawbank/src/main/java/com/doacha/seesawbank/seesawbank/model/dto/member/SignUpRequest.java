package com.doacha.seesawbank.seesawbank.model.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequest {
    @Schema(description = "사용자 아이디", example = "tldnjs324", required = true)
    private final String memberId;

    @Schema(description = "사용자 비밀번호", example = "qkrtldnjs", required = true)
    private final String memberPassword;

    @Schema(description = "사용자 이름", example = "박시원", required = true)
    private final String memberName;

}
