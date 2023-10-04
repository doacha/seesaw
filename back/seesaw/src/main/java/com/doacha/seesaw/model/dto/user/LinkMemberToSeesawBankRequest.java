package com.doacha.seesaw.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LinkMemberToSeesawBankRequest {

    private String memberEmail;

    private String memberBankId;

    private String memberMainAccount;

}
