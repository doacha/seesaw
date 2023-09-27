package com.doacha.seesaw.model.dto.spending;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MonthSpendingSumResponse {
    private long spendingCostSum;
    private int spendingYear;
    private int spendingMonth;
    private String memberEmail;

}
