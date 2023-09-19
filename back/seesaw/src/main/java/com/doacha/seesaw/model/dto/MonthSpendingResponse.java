package com.doacha.seesaw.model.dto;

import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
public class MonthSpendingResponse {
    private Long spendingId;
    private String spendingTitle;
    private int spendingCost;
    private Timestamp spendingDate;
    private int spendingCategoryId;
    private String memberEmail;
}
