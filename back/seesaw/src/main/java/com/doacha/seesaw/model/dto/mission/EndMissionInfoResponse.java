package com.doacha.seesaw.model.dto.mission;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "종료 미션 기본 정보 response 제목 이미지 시작일 끝일 성공여부 설명 카테고리")
public class EndMissionInfoResponse {

    @Schema(description = "미션 제목", example = "일주일동안 5만원 쓰기", required = true)
    private String missionTitle;

    @Schema(description = "미션 이미지 Url", required = false)
    private String missionImgUrl;

    @Schema(description = "미션 시작 날짜", example = "2023-09-11", required = true)
    private Date missionStartDate;

    @Schema(description = "미션 끝난 날짜", example = "2023-09-18", required = true)
    private String missionEndDate;

    @Schema(description = "미션 상태", example = "0", required = true)
    private int memberMissionStatus;

    @Schema(description = "미션 소개글", example = "일주일동안 5만원쓰기 같이 하실 분!!", required = true)
    private String missionPurpose;

    @Schema(description = "미션 카테고리", example = "0", required = true)
    private int missionCategoryId;

    @Schema(description = "미션 기간", example = "7", required = true)
    private int missionPeriod;

    @Schema(description = "미션 총 횟수", example = "4", required = true)
    private int missionTotalCycle;
}
