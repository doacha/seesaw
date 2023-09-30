package com.doacha.seesaw.model.dto.mission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "계좌 이체 API 요청 DTO")
public class AccountTransferRequest {
    @Schema(description = "계좌 번호 (시소)", example = "457899-01-100001", required = true)
    private String accountNum;

    @Schema(description = "거래 계좌 번호 (사용자)", example = "457899-01-100002", required = true)
    private String accountTransactionNum;

    @Schema(description = "계좌 거래 금액 (반환 예치금)", example = "10000", required = true)
    private int accountApprovalAmount;

    @Schema(description = "계좌 비밀번호 (1234)", example = "1234", required = true)
    private String accountPassword;
}
