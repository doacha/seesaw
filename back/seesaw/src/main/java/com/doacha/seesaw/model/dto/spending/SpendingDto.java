package com.doacha.seesaw.model.dto.spending;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SpendingDto {
    private String spendingTitle;
    private int spendingCost;
    private Timestamp spendingDate;
    private String spendingMemo;
    private int spendingCategoryId;
    private String memberEmail;
}
