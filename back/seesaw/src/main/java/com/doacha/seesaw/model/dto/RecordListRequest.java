package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Record 글 목록 request")
public class RecordListRequest {

    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

    @Schema(description = "미션(레코드) 회차", example = "1", required = true)
    private int recordNumber;
}
