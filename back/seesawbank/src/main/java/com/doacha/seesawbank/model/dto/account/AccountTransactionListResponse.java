package com.doacha.seesawbank.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "계좌에 대한 거래 내역 리스트 reponse")
public class AccountTransactionListResponse {
    // 거래 내역, 시간, 거래금액
    @Schema(description = "거래 내역", example = "왕가탕후루", required = true)
    private String accountTransactionName;

    @Schema(description = "계좌 거래 일시", example = "2023/09/18 10:21:22", required = true)
    private Timestamp accountTransactionTime;

    @Schema(description = "계좌 거래 금액", example = "10000", required = true)
    private int accountApprovalAmount;
}
