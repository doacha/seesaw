package com.doacha.seesaw.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SpendingSumRequest {
    private String memberEmail;
    private int spendingYear;
    private int spendingMonth;
}
