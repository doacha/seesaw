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

    private String missionFrugalSpender;

    private Long missionFrugalSpending;

    private String missionTopSpender;

    private Long missionTopSpending;

    private String recordTopSpender;

    private int recordTopSpending;

    private int recordTopSpendingNum;
}
