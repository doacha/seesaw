package com.doacha.seesaw.model.dto;

import com.doacha.seesaw.model.entity.User;
import lombok.Getter;

@Getter
public class UserResponse {
    private final String userEmail;

    private final String userNickname;

    private UserResponse(String userEmail, String userNickname) {
        this.userEmail = userEmail;
        this.userNickname = userNickname;
    }

    public static UserResponse of(User user) {
        return new UserResponse(
                user.getUserEmail(),
                user.getUserNickname());
    }
}
