package com.doacha.seesaw.model.dto;


import lombok.*;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DailySpendingSumResponse {
    private long spendingCostSum;
    private int spendingDay;
    private String memberEmail;

}
