package com.doacha.seesaw.model.dto.mission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MissionStatsResponse {
    private String memberEmail;
    private Long sum;
    private Double missionAvg;
    private int categoryId;
}
