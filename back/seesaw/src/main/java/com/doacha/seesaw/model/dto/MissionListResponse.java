package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "미션 목록 response")
public class MissionListResponse {

    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

    @Schema(description = "미션 제목", example = "일주일동안 5만원 쓰기", required = true)
    private String missionTitle;

    @Schema(description = "미션 그룹 인원수", example = "2", required = true)
    private int missionMemberCount;

    @Schema(description = "총 모집 인원수", example = "6", required = true)
    private int missionMaxCount;

    @Schema(description = "미션 이미지 Url", required = false)
    private String missionImgUrl;

    @Schema(description = "미션 목표 금액", example = "30000", required = true)
    private int missionLimit;

    @Schema(description = "미션 기간", example = "7", required = true)
    private int missionPeriod;

    @Schema(description = "미션 총 횟수", example = "4", required = true)
    private int missionTotalCycle;

    @Schema(description = "미션 시작일", example = "2023-09-11", required = true)
    private Date missionStartDate;
}
