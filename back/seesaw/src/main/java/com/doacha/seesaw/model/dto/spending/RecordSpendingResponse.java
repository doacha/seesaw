package com.doacha.seesaw.model.dto.spending;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecordSpendingResponse {

    private String spendingTitle;

    private int spendingCost;

}
