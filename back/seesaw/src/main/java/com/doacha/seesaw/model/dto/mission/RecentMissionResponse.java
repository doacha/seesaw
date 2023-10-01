package com.doacha.seesaw.model.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecentMissionResponse {
    private String missionId;
    private String memberEmail;
    private int recordTotalCost;
    private int recordNumber;
}
