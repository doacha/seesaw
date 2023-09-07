package com.doacha.seesaw.controller;

import com.doacha.seesaw.jwt.JwtProvider;
import com.doacha.seesaw.jwt.TokenResponse;
import com.doacha.seesaw.model.dto.LoginRequest;
import com.doacha.seesaw.model.dto.SignUpRequest;
import com.doacha.seesaw.model.dto.MemeberResponse;
import com.doacha.seesaw.model.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    @PostMapping("/signup")
    public MemeberResponse signUp(@RequestBody SignUpRequest signUpRequest) {
        return memberService.signUp(signUpRequest);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
        MemeberResponse memeberResponse = memberService.login(loginRequest);
        return jwtProvider.createTokensByLogin(memeberResponse);
    }

    @PostMapping("/confirm")
    public boolean confirmPassword(@RequestBody LoginRequest loginRequest) {
        return memberService.confirmPassword(loginRequest);
    }
}
