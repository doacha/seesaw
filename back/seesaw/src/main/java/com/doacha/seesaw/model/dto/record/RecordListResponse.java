package com.doacha.seesaw.model.dto.record;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Record 글 목록 response")
public class RecordListResponse {

    // 사용자 닉네임, 사용금액, 성공여부를 금액기준 오름차순으로
    @Schema(description = "레코드 아이디", example = "1", required = true)
    private Long recordId;

    @Schema(description = "사용자 닉네임", example = "닉네임", required = true)
    private String memberNickname;

    @Schema(description = "레코드 사용 금액", example = "10000", required = true)
    private int recordTotalCost;

    @Schema(description = "성공 여부", example = "1", required = true)
    private int recordStatus;
}
