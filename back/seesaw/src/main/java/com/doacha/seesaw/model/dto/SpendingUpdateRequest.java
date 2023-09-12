package com.doacha.seesaw.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SpendingUpdateRequest {
    private Long spendingId;
    private String spendingTitle;
    private int spendingCost;
    private Timestamp spendingDate;
    private String spendingMemo;
    private Long categoryId;
    private String memberEmail;
}
