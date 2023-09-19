package com.doacha.seesaw.model.dto.user;

import com.doacha.seesaw.model.entity.Member;
import lombok.Getter;

@Getter
public class MemberResponse {
    private final String memberEmail;

    private final String memberNickname;

    private MemberResponse(String memberEmail, String memberNickname) {
        this.memberEmail = memberEmail;
        this.memberNickname = memberNickname;
    }

    public static MemberResponse of(Member member) {
        return new MemberResponse(
                member.getMemberEmail(),
                member.getMemberNickname());
    }
}
