package com.doacha.seesaw.model.dto;

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
    private int categoryId;
    private String memberEmail;
}
