package com.doacha.seesaw.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "예치금 이체 api")
public class BalanceTransferRequest {
    @Schema(description = "예치금 금액", example = "10000", required = true)
    private int accountApprovalAmount;

    @Schema(description = "이메일", example = "tldnjs324@naver.com", required = true)
    private String memberEmail;

    @Schema(description = "계좌 비밀번호", example = "1234", required = true)
    private String accountPassword;
}
