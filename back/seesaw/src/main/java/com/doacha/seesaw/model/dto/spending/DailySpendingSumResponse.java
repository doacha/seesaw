package com.doacha.seesaw.model.dto.spending;


import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class DailySpendingSumResponse {
    private long spendingCostSum;
    private int spendingDay;
    private String memberEmail;

}
