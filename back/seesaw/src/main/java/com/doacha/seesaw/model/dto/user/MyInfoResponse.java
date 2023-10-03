package com.doacha.seesaw.model.dto.user;

import com.doacha.seesaw.model.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
//@AllArgsConstructor
public class MyInfoResponse {
    private final String memberEmail;

    private final String memberName;

    private final String memberNickname;

    private final String memberBirth;

    private final boolean memberGender;

    private final String memberImgUrl;

    private final String memberPhoneNumber;

    private MyInfoResponse(String memberEmail, String memberNickname, String memberName, String memberBirth, boolean memberGender, String memberImgUrl, String memberPhoneNumber) {
        this.memberEmail = memberEmail;
        this.memberNickname = memberNickname;
        this.memberName = memberName;
        this.memberBirth = memberBirth;
        this.memberGender = memberGender;
        this.memberImgUrl = memberImgUrl;
        this.memberPhoneNumber = memberPhoneNumber;
    }

    public static MyInfoResponse of(Member member) {
        return new MyInfoResponse(
                member.getMemberEmail(),
                member.getMemberNickname(),
                member.getMemberName(),
                member.getMemberBirth(),
                member.isMemberGender(),
                member.getMemberImgUrl(),
                member.getMemberPhoneNumber()
        );
    }
}
