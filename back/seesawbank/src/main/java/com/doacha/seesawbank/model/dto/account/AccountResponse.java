package com.doacha.seesawbank.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "계좌 정보 response")
public class AccountResponse {
    @Schema(description = "계좌 이름", example = "최애 만날 때까지 숨참고 적금", required = true)
    private String accountName;

    @Schema(description = "계좌 번호", example = "457899-01-100001", required = true)
    private String accountNum;

    @Schema(description = "사용자 이름", example = "도아차", required = true)
    private String memberName;
}
