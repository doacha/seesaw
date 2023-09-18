package com.doacha.seesawbank.model.dto.user;

import com.doacha.seesawbank.model.entity.User;
import lombok.Getter;

@Getter
public class UserResponse {
    private final String userId;

    private final String userName;

    private UserResponse(String userId, String userName) {
        this.userId = userId;
        this.userName = userName;
    }

    public static UserResponse of(User user) {
        return new UserResponse(
                user.getUserId(),
                user.getUserName());
    }
}
