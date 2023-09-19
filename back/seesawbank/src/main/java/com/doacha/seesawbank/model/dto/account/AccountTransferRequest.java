package com.doacha.seesawbank.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "계좌 이체 request")
public class AccountTransferRequest {
    @Schema(description = "계좌 번호", example = "457899-01-100001", required = true)
    private String accountNum;

    @Schema(description = "거래 계좌 번호 (출금인 경우만 기입)", example = "457899-01-100002", required = true)
    private String accountTransactionNum;

    @Schema(description = "계좌 거래 금액", example = "10000", required = true)
    private int accountApprovalAmount;

    @Schema(description = "계좌 비밀번호", example = "1234", required = true)
    private String accountPassword;

}
