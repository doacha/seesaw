package com.doacha.seesaw.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "계좌 생성 request")
public class CreateAccountRequest {
    @Schema(description = "계좌 이름", example = "최애 만날 때까지 숨참고 적금", required = true)
    private String accountName;

    @Schema(description = "사용자 아이디", example = "tldnjs324", required = true)
    private String memberId;

    @Schema(description = "계좌 비밀번호", example = "1234", required = true)
    private String accountPassword;
}