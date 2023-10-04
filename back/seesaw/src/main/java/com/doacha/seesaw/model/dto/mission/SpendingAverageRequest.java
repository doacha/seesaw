package com.doacha.seesaw.model.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpendingAverageRequest {
    private int categoryId;
    private String memberEmail;
}
