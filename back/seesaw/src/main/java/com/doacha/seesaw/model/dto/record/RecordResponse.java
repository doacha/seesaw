package com.doacha.seesaw.model.dto.record;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Record 글 등록/수정/상세 response")
public class RecordResponse {

    private Long recordId;

    private String recordContent;

    private Timestamp recordWriteTime;

    private int recordTotalCost;

    private int recordNumber;

    private int recordStatus;

    private String memberEmail;

    private String memberNickname;

    private String memberImgUrl;
}
