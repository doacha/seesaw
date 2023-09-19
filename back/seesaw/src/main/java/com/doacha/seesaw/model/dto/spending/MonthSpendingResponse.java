package com.doacha.seesaw.model.dto.spending;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
