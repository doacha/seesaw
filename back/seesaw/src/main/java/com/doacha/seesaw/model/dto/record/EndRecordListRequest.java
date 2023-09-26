package com.doacha.seesaw.model.dto.record;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "개인별 끝난 미션 Record 글 목록 request")
public class EndRecordListRequest {
    @Schema(description = "이메일", example = "doacha@seesaw.com", required = true)
    private String memberEmail;

    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

}
