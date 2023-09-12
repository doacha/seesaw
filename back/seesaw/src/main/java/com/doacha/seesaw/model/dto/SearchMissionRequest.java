package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "미션 검색 request")
public class SearchMissionRequest {
    @Schema(description = "검색어", example = "검색어", required = false)
    private String keyword;

    @Schema(description = "미션 카테고리 아이디", example = "0", required = false)
    private Integer missionCategoryId;

    @Schema(description = "미션 빈도", example = "7", required = false)
    private Integer missionPeriod;

    @Schema(description = "미션 총 횟수", example = "4", required = false)
    private Integer missionCycle;
}
