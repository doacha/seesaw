package com.doacha.seesaw.model.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyMissionStatResponse {
    private String missionId;
    private Long sum;
    private Long ranking;
    private int missionMemberCount;
    private String memberEmail;
    private Double average;
    private Long count;
}
