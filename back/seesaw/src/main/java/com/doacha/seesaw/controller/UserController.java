package com.doacha.seesaw.controller;

import com.doacha.seesaw.jwt.JwtProvider;
import com.doacha.seesaw.jwt.TokenResponse;
import com.doacha.seesaw.model.dto.LoginRequest;
import com.doacha.seesaw.model.dto.SignUpRequest;
import com.doacha.seesaw.model.dto.UserResponse;
import com.doacha.seesaw.model.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @PostMapping("/signup")
    public UserResponse signUp(
            @RequestBody SignUpRequest signUpRequest
    ) {
        return userService.signUp(signUpRequest);
    }

    @PostMapping("/login")
    public TokenResponse login(
            @RequestBody LoginRequest loginRequest
    ) throws JsonProcessingException {
        UserResponse userResponse = userService.login(loginRequest);
        return jwtProvider.createTokensByLogin(userResponse);
    }
}
