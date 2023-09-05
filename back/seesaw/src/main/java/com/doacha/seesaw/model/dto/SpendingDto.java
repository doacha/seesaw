package com.doacha.seesaw.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class SpendingDto {
    private String spendingTitle;
    private int spendingCost;
    private String spendingDate;
    private int categoryId;
    private String userEmail;
    private int reportId;
}
