package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "적금 이체 API 요청 DTO")
public class SavingRequest {

    @Schema(description = "일반 계좌 번호 (출금인 경우만 기입)", example = "457899-01-100002", required = true)
    private String mainAccount;

    @Schema(description = "적금 계좌 번호", example = "457899-01-100001", required = true)
    private String savingAccount;

    @Schema(description = "계좌 거래 금액", example = "10000", required = true)
    private int accountApprovalAmount;
}
