package com.doacha.seesaw.model.dto.mission;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "예치금 반환 목록")
public class ReturnDepositList {
    @Schema(description = "사용자 이메일", example = "doach@seesaw.com", required = true)
    private String memberEmail;

    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

    @Schema(description = "일반 계좌 번호", example = "457899-01-100002", required = true)
    private String memberMainAccount;

    @Schema(description = "예치금 반환액", example = "1000", required = true)
    private int memberMissionRefund;
}
