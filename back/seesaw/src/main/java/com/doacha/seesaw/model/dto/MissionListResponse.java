package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "그룹 목록 response")
public class MissionListResponse {

    @Schema(description = "그룹 아이디", example = "abcd1234", required = true)
    private String groupId;

    @Schema(description = "그룹 제목", example = "일주일동안 5만원 쓰기", required = true)
    private String groupTitle;

    @Schema(description = "현재 그룹 인원수", example = "2", required = true)
    private int groupMemberCount;

    @Schema(description = "총 모집 인원수", example = "6", required = true)
    private int groupMaxCount;

    @Schema(description = "그룹 이미지 Url", required = false)
    private String groupImgUrl;

    @Schema(description = "최소 예치금", example = "30000", required = true)
    private int groupMinDeposit;
}
