package com.doacha.seesaw.model.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MissionRankingResponse {
    private String missionTopSpender;
    private Long missionTopSpending;
    private String missionFrugalSpender;
    private Long missionFrugalSpending;
    private String recordTopSpender;
    private Long recordTopSpending;
    private Long recordTopSpendingNum;
}
