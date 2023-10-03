package com.doacha.seesaw.model.dto.spending;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MemberSpendingSumDto {
    private String memberNickname;
    private int categoryId;
    private Long sum;
}
