package com.doacha.seesaw.model.dto.mission;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyMissionRankingResponse {
    private String missionId;
    private Long sum;
    private Long ranking;
    private String memberEmail;
    private int missionMemberCount;
}
