package com.doacha.seesaw.model.dto;

import com.doacha.seesaw.model.entity.Member;
import lombok.Getter;

@Getter
public class MemeberResponse {
    private final String memberEmail;

    private final String memberNickname;

    private MemeberResponse(String memberEmail, String memberNickname) {
        this.memberEmail = memberEmail;
        this.memberNickname = memberNickname;
    }

    public static MemeberResponse of(Member member) {
        return new MemeberResponse(
                member.getMemberEmail(),
                member.getMemberNickname());
    }
}
