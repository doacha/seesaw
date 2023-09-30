package com.doacha.seesawbank.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "1원 인증 본인 확인 Request")
public class CheckAuthenticationRequest {

    @Schema(description = "거래 번호", example = "abcd1234", required = true)
    private String accountDealNum;

    @Schema(description = "인증 번호", example = "1", required = true)
    private String authenticationNum;
}