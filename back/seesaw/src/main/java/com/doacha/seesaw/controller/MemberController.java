package com.doacha.seesaw.controller;

import com.doacha.seesaw.jwt.JwtProvider;
import com.doacha.seesaw.jwt.MemberDetail;
import com.doacha.seesaw.jwt.TokenResponse;
import com.doacha.seesaw.model.dto.user.*;
import com.doacha.seesaw.model.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    // 토큰 테스트용
    @GetMapping("/test")
    public String test() {
        return "good!";
    }
    @PostMapping("/signup")
    public MemberResponse signUp(@RequestBody SignUpRequest signUpRequest) {
        return memberService.signUp(signUpRequest);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
        MemberResponse memberResponse = memberService.login(loginRequest);
        return jwtProvider.createTokensByLogin(memberResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest servletRequest) {
        memberService.logout();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/confirm")
    public MyInfoResponse confirmPassword(@RequestBody LoginRequest loginRequest) {
        return memberService.confirmPassword(loginRequest);
    }

    @PutMapping("/modify")
    public MyInfoResponse changeInfo(@RequestBody ChangeInfoRequest changeInfoRequest) {
        return memberService.changeInfo(changeInfoRequest);
    }

    @GetMapping("/delete/{memberEmail}")
    public boolean deleteMember(@PathVariable  String memberEmail) {
        return memberService.deleteMember(memberEmail);
    }

    @GetMapping("/reissue")
    public TokenResponse reissue(@AuthenticationPrincipal MemberDetail memberDetail) throws JsonProcessingException {
        MemberResponse memberResponse = MemberResponse.of(memberDetail.getMember());
        return jwtProvider.reissueAtk(memberResponse);
    }
}
