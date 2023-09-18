package com.doacha.seesawbank.seesawbank.model.dto.member;

import com.doacha.seesawbank.seesawbank.model.entity.Member;
import lombok.Getter;

@Getter
public class MemberResponse {
    private final String memberId;

    private final String memberName;

    private MemberResponse(String memberId, String memberName) {
        this.memberId = memberId;
        this.memberName = memberName;
    }

    public static MemberResponse of(Member member) {
        return new MemberResponse(
                member.getMemberId(),
                member.getMemberName());
    }
}
