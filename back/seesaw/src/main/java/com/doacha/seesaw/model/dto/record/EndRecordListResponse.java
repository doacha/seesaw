package com.doacha.seesaw.model.dto.record;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "개인별 끝난 미션 Record 글 목록 response")
public class EndRecordListResponse {
    // 회차, 그 회차에 사용한 금액, 시작일, 끝일, 글 내용, 성공 여부
    @Schema(description = "회차", example = "1", required = true)
    private int recordNumber;

    @Schema(description = "사용 금액", example = "9000", required = true)
    private int recordTotalCost;

    @Schema(description = "시작일", example = "1", required = true)
    private Date startDate;

    @Schema(description = "끝일", example = "9000", required = true)
    private Date EndDate;

    @Schema(description = "글 내용", example = "오늘 봉준이형이 5000원을 뜯어갔다.", required = true)
    private String recordContent;

    @Schema(description = "성공 여부(1성공, 2실패)", example = "1", required = true)
    private int recordStatus;
}
