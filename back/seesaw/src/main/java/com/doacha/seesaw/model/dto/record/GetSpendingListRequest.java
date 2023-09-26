package com.doacha.seesaw.model.dto.record;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "미션 상세 회차별 소비내역 request")
public class GetSpendingListRequest {
    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private String memberEmail;

    @Schema(description = "페이지 번호", example = "doacha@seesaw.com", required = true)
    private int pageNumber;
}
