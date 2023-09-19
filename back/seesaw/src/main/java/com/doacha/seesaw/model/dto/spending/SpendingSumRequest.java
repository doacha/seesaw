package com.doacha.seesaw.model.dto.spending;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SpendingSumRequest {
    private String memberEmail;
    private int spendingYear;
    private int spendingMonth;
}
