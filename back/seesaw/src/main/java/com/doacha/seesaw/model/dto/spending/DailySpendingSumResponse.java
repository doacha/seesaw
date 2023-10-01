package com.doacha.seesaw.model.dto.spending;


import lombok.*;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class DailySpendingSumResponse {
    private long spendingCostSum;
    private Timestamp spendingDate;
    private String memberEmail;


}
