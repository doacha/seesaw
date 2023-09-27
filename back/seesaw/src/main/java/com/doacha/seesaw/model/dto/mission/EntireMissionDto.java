package com.doacha.seesaw.model.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EntireMissionDto {
    private String missionId;
    private Long sum;
    private int missionPeriod;
    private int missionTotalCycle;
    private int missionMemberCount;
}
