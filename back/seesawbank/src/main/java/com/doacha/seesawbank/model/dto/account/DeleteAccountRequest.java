package com.doacha.seesawbank.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "계좌 생성 request")
public class DeleteAccountRequest {
    @Schema(description = "계좌 번호", example = "457899-01-381487", required = true)
    private String accountNum;

    @Schema(description = "계좌 비밀번호", example = "1234", required = true)
    private String accountPassword;
}
