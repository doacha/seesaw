package com.doacha.seesaw.model.dto.spending;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "카드 거래내역 조회 request")
public class GetCardTransactionRequest {

    @Schema(description = "사용자 아이디")
    private String memberId;

    @Schema(description = "카드 거래내역 조회 시작일시")
    private Timestamp startDateTime;

    @Schema(description = "카드 거래내역 조회 종료일시")
    private Timestamp endDateTime;
}
