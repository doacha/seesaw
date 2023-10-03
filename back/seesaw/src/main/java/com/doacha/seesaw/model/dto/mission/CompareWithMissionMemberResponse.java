package com.doacha.seesaw.model.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompareWithMissionMemberResponse {
    private String missionId;
    private String memberEmail;
    private String memberNickname;

    private int firstCategoryId;
    private double firstCategoryMissionAverage;
    private double firstCategoryMemberAverage;

    private int secondCategoryId;
    private double secondCategoryMissionAverage;
    private double secondCategoryMemberAverage;

    private int thirdCategoryId;
    private double thirdCategoryMissionAverage;
    private double thirdCategoryMemberAverage;

    private int frugalCategoryId;
    private double frugalCategoryMissionAverage;
    private double frugalCategoryMemberAverage;

}
