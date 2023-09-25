package com.doacha.seesaw.model.dto.mission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "미션 생성 request")
public class CreateMissionRequest {

    @Schema(description = "미션 제목", example = "일주일동안 5만원 쓰기", required = true)
    private String missionTitle;

    @Schema(description = "총 모집 인원수", example = "6", required = true)
    private int missionMaxCount;

    @Schema(description = "미션 이미지 Url", required = false)
    private String missionImgUrl;

    @Schema(description = "미션 소개글", example = "일주일동안 5만원쓰기 같이 하실 분!!", required = true)
    private String missionPurpose;

    @Schema(description = "예치금", example = "30000", required = true)
    private int missionDeposit;

    @Schema(description = "미션 공개 여부", example = "true", required = true)
    private boolean missionIsPublic;

    @Schema(description = "미션 금액", example = "50000", required = true)
    private int missionTargetPrice;

    @Schema(description = "미션 기간", example = "7", required = true)
    private int missionPeriod;

    @Schema(description = "미션 총 횟수", example = "4", required = true)
    private int missionTotalCycle;

    @Schema(description = "미션 시작일", example = "2023-09-11", required = true)
    private String missionStartDate;

    @Schema(description = "미션 그룹장 이메일", example = "doacha@seesaw.com", required = true)
    private String missionHostEmail;

    @Schema(description = "미션 카테고리 아이디", example = "0", required = true)
    private int missionCategoryId;

    @Schema(description = "적금 금액", example = "true", required = true)
    private int memberMissionSavingMoney;
}
