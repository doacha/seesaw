package com.doacha.seesaw.model.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DailySpendingSumResponse {
    private long spendingCostSum;
    private int spendingDay;
    private String memberEmail;

}
