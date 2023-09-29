package com.doacha.seesaw.model.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DailyTopSpendingResponse {
    private String dailyTopSpender;
    private Long dailyTopSpending;
    private Long dailyTopSpendingNum;

}
