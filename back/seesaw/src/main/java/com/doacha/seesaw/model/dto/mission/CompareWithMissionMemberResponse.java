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

    private int firstCategoryId;
    private double firstCategoryGroupAverage;
    private double firstCategoryMemberAverage;

    private int secondCategoryId;
    private double secondCategoryGroupAverage;
    private double secondCategoryMemberAverage;

    private int thirdCategoryId;
    private double thirdCategoryGroupAverage;
    private double thirdCategoryMemberAverage;

    private int frugalCategoryId;
    private double frugalCategoryGroupAverage;
    private double frugalCategoryMemberAverage;

}
