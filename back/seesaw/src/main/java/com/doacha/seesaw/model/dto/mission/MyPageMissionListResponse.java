package com.doacha.seesaw.model.dto.mission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "마이페이지 미션 목록 response")
public class MyPageMissionListResponse {
    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

    @Schema(description = "미션 제목", example = "일주일동안 5만원 쓰기", required = true)
    private String missionTitle;

    @Schema(description = "미션 이미지 Url", required = false)
    private String missionImgUrl;

    @Schema(description = "미션 시작 날짜", example = "2023-09-11", required = true)
    private Date missionStartDate;

    @Schema(description = "미션 끝난 날짜", example = "2023-09-18", required = true)
    private String missionEndDate;

    @Schema(description = "미션 상태", example = "0", required = true)
    private int missionStatus;
}
