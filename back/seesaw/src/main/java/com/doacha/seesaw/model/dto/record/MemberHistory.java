package com.doacha.seesaw.model.dto.record;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberHistory {

    @Schema(description = "레코드 아이디", example = "1", required = true)
    private Long recordId;

    @Schema(description = "미션 회차", example = "1", required = true)
    private int recordNumber;

    @Schema(description = "사용자 닉네임", example = "닉네임", required = true)
    private String memberNickname;

    @Schema(description = "사용자 프로필 사진", required = true)
    private String memberImgUrl;

    @Schema(description = "레코드 사용 금액", example = "10000", required = true)
    private int recordTotalCost;

    @Schema(description = "성공 여부", example = "1", required = true)
    private int recordStatus;
}
