package com.doacha.seesaw.model.dto.spending;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "카드 거래내역 요청을 위한 DTO")
public class GetCardTransactionDto {

    @Schema(description = "사용자 아이디")
    private String memberEmail;

    @Schema(description = "시소뱅크 아이디")
    private String memberBankId;

    @Schema(description = "가계부 마지막 내역 거래일시")
    private Timestamp lastSpendingTime;

}
