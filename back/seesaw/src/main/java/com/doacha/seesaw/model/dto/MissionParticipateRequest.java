package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "미션 참여 request")
public class MissionParticipateRequest {
    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private String userEmail;

    @Schema(description = "예치금", example = "40000", required = true)
    private int userMissionDeposit;
}
