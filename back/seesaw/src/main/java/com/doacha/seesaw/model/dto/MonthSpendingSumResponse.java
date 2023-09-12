package com.doacha.seesaw.model.dto;


import lombok.*;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MonthSpendingSumResponse {
    private long spendingCostSum;
    private int spendingMonth;
    private String memberEmail;

}
