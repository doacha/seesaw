package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "미션 탈퇴 request")
public class QuitMissionRequest {

    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private String memberEmail;
}
