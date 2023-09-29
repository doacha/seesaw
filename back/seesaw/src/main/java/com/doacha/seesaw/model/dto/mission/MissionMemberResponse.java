package com.doacha.seesaw.model.dto.mission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "미션 참여자 response")
public class MissionMemberResponse {

    @Schema(description = "사용자 닉네임")
    private String memberNickname;

    @Schema(description = "사용자 프로필 사진")
    private String memberImgUrl;
}
