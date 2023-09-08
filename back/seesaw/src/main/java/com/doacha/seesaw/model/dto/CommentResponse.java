package com.doacha.seesaw.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "댓글 작성 response")
public class CommentResponse {

    @Schema(description = "댓글 아이디", example = "1", required = true)
    private Long commentId;

    @Schema(description = "댓글 내용", example = "댓글입니다", required = true)
    private String commentContent;

    @Schema(description = "사용자 닉네임", example = "도아차차", required = true)
    private String memberNickname;

    @Schema(description = "게시글 작성일시", example = "2023-09-08", required = true)
    private String commentWriteTime;
}
