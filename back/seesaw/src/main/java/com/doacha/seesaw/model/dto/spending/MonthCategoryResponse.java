package com.doacha.seesaw.model.dto.spending;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MonthCategoryResponse {
    private long spendingCostSum;
    private int spendingMonth;
    private String memberEmail;
    private int spendingCategoryId;
}
