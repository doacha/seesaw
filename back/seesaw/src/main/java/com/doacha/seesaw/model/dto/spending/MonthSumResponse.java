package com.doacha.seesaw.model.dto.spending;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MonthSumResponse {
    private Long spendingCostSum;
    private Timestamp spendingDate;
}
