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
@Schema(description = "카드 거래내역 요청을 위한 DTO")
public class GetCardTransactionResponse {
            private String memberId;
            private String cardApprovalNum;
            private String cardStoreName;
            private int cardApprovalAmount;
            private String cardCompany;
            private String cardStoreCategory;
            private Timestamp cardTransactionTime;
}
