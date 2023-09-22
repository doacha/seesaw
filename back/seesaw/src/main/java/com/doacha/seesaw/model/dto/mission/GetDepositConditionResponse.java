package com.doacha.seesaw.model.dto.mission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "미션 상세 나의 현황 response")
public class GetDepositConditionResponse {

    @Schema(description = "미션 총인원", example = "1", required = true)
    private int missionMemberCnt;

    @Schema(description = "미션 실패 인원", example = "1", required = true)
    private int missionFailMemberCnt;

    @Schema(description = "내가 받을 금액의 변화", example = "1000", required = true)
    private int changedDeposit;

    @Schema(description = "미션 실패 가능 기회", example = "2", required = true)
    private int failCnt;

    @Schema(description = "나의 미션 실패 횟수", example = "2", required = true)
    private int myFailCnt;
}
