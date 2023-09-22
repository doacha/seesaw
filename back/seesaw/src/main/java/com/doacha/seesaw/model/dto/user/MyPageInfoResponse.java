package com.doacha.seesaw.model.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
@Schema(description = "마이페이지 내 정보 Response")
public class MyPageInfoResponse {

    @Schema(description = "사용자 닉네임", example = "차도아", required = true)
    private final String memberNickname;

    @Schema(description = "프로필 사진 url", example = "http....", required = false)
    private final String memberImgUrl;

    @Schema(description = "성공 챌린지 수", example = "3", required = true)
    private final int successMissionCnt;

    @Schema(description = "완료 챌린지 수", example = "3", required = true)
    private final int failMissionCnt;

    @Schema(description = "진행 중 챌린지 수", example = "2", required = true)
    private final int ingMissionCnt;

    // TODO: 절약 금액 계산해서 넣어라
//    @Schema(description = "절약 금액", example = "290000", required = true)
//    private final int savings;
}
