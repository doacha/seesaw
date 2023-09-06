package com.doacha.seesaw.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MonthSpendingResponse {
    private String spendingTitle;
    private int spendingCost;
    private String spendingDate;
    private Long categoryId;
    private String userEmail;
}
