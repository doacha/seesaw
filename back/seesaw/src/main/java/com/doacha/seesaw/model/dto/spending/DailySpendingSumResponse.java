package com.doacha.seesaw.model.dto.spending;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DailySpendingSumResponse {
    private long spendingCostSum;
    private int spendingDay;
    private Timestamp spendingDate;
    private String memberEmail;

}
