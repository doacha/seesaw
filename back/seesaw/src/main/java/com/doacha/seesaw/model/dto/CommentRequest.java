package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "댓글 작성 request")
public class CommentRequest {

    @Schema(description = "댓글 아이디", example = "1", required = true)
    private Long commentId;

    @Schema(description = "레코드 아이디", example = "1", required = true)
    private Long recordId;

    @Schema(description = "댓글 내용", example = "댓글입니다", required = true)
    private String commentContent;

    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private String memberEmail;

}
