package com.doacha.seesaw.jwt;

import lombok.Getter;

@Getter
public class Subject {
    private final String userEmail;

    private final String userNickname;

    private final String tokenType;

    private Subject(String userEmail, String userNickname, String tokenType) {
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.tokenType = tokenType;
    }

    public static Subject atk(String userEmail, String userNickname) {
        return new Subject(userEmail, userNickname, "ATK");
    }

    public static Subject rtk(String userEmail, String userNickname) {
        return new Subject(userEmail, userNickname, "RTK");
    }
}
