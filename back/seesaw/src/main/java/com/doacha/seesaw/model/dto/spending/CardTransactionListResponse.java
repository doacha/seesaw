package com.doacha.seesaw.model.dto.spending;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CardTransactionListResponse {
    private String memberId;
    private String cardApprovalNum;
    private String cardStoreName;
    private int cardApprovalAmount;
    private String cardStoreCategory;
    private Timestamp cardTransactionTime;
}
