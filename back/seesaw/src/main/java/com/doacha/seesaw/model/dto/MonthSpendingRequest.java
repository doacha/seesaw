package com.doacha.seesaw.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MonthSpendingRequest {
    private String userEmail;
    private String spendingYear;
    private String spendingMonth;
}
