package com.doacha.seesaw.model.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyMissionAverageResponse {
    private String missionId;
    private Long average;
    private String memberEmail;
    private Long count;
}
