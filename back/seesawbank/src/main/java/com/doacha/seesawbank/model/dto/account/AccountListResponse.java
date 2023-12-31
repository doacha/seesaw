package com.doacha.seesawbank.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "계좌 리스트 response")
public class AccountListResponse {
    @Schema(description = "계좌 이름", example = "귀여운 차차 통장", required = true)
    private String accountName;

    @Schema(description = "계좌 종류(0: 일반계좌, 1: 적금계좌)", example = "1", required = true)
    private int accountType;

    @Schema(description = "계좌 번호", example = "457899-01-100001", required = true)
    private String accountNum;

    @Schema(description = "은행 이름(숫자코드로 소통)", example = "0", required = true)
    private int accountBankName;

    @Schema(description = "남은 금액", example = "0", required = true)
    private int accountBalance;
}
