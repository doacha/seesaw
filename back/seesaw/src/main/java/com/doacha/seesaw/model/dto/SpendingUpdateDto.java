package com.doacha.seesaw.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SpendingUpdateDto {
    private Long spendingId;
    private String spendingTitle;
    private int spendingCost;
    private String spendingDate;
    private String spendingMemo;
    private Long categoryId;
    private String userEmail;
}
