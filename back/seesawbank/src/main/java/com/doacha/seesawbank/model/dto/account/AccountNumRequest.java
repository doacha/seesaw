package com.doacha.seesawbank.model.dto.account;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.print.Pageable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "계좌번호 pageable 위한 dto")
public class AccountNumRequest {
    @Schema(description = "계좌 번호", example = "457899-01-100001", required = true)
    private String accountNum;

    @Schema(description = "페이지번호", example = "0", required = true)
    private int pageNum;
}
