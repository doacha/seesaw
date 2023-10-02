package com.doacha.seesaw.model.dto.spending;


import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class MonthSpendingSumResponse {
    private long spendingCostSum;
    private int spendingYear;
    private int spendingMonth;
    private String memberEmail;

}
