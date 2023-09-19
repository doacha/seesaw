package com.doacha.seesaw.jwt;

import lombok.Getter;

@Getter
public class Subject {
    private final String memberEmail;

    private final String memberNickname;

    private final String tokenType;

    private Subject(String memberEmail, String memberNickname, String tokenType) {
        this.memberEmail = memberEmail;
        this.memberNickname = memberNickname;
        this.tokenType = tokenType;
    }

    public static Subject atk(String memberEmail, String memberNickname) {
        return new Subject(memberEmail, memberNickname, "ATK");
    }

    public static Subject rtk(String memberEmail, String memberNickname) {
        return new Subject(memberEmail, memberNickname, "RTK");
    }
}
