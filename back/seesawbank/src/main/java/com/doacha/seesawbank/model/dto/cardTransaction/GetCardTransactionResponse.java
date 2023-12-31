package com.doacha.seesawbank.model.dto.cardTransaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCardTransactionResponse {

    private String memberId;
    private String cardApprovalNum;
    private String cardStoreName;
    private int cardApprovalAmount;
    private String cardCompany;
    private String cardStoreCategory;
    private Timestamp cardTransactionTime;

}
