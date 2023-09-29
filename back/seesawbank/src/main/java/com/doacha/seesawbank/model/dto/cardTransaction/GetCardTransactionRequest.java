package com.doacha.seesawbank.model.dto.cardTransaction;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "카드 거래내역 request")
public class GetCardTransactionRequest {

    @Schema(description = "사용자 아이디", required = true)
    private String memberId;
    @Schema(description = "조회 시작일시", example = "", required = false)
    private Timestamp startDateTime;

    @Schema(description = "조회 종료일시", example = "", required = false)
    private Timestamp endDateTime;
}
