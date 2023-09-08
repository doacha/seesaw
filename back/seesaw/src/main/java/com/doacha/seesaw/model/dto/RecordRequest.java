package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Record 글 등록/수정 request")
public class RecordRequest {

    @Schema(description = "레코드 아이디", example = "1", required = true)
    private Long recordId;

    @Schema(description = "글 내용", example = "미션 글 내용", required = true)
    private String recordContent;

}
