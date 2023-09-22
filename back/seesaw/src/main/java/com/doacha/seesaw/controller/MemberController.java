package com.doacha.seesaw.controller;

import com.doacha.seesaw.jwt.JwtProvider;
import com.doacha.seesaw.jwt.MemberDetail;
import com.doacha.seesaw.jwt.TokenResponse;
import com.doacha.seesaw.model.dto.user.*;
import com.doacha.seesaw.model.service.MemberMissionService;
import com.doacha.seesaw.model.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
    private final MemberService memberService;
    private final MemberMissionService memberMissionService;
    private final JwtProvider jwtProvider;
    
    // 회원가입
    @PostMapping("/signup")
    public MemberResponse signUp(@RequestBody SignUpRequest signUpRequest) {
        return memberService.signUp(signUpRequest);
    }

    // 로그인
    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
        MemberResponse memberResponse = memberService.login(loginRequest);
        return jwtProvider.createTokensByLogin(memberResponse);
    }

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest servletRequest) {
        memberService.logout();
        return ResponseEntity.ok().build();
    }

    // 비밀번호 확인
    @PostMapping("/confirm")
    public MyInfoResponse confirmPassword(@RequestBody LoginRequest loginRequest) {
        return memberService.confirmPassword(loginRequest);
    }

    // 회원 정보 수정
    @PutMapping("/modify")
    public MyInfoResponse changeInfo(@RequestBody ChangeInfoRequest changeInfoRequest) {
        return memberService.changeInfo(changeInfoRequest);
    }

    // 회원 탈퇴
    @GetMapping("/delete/{memberEmail}")
    public boolean deleteMember(@PathVariable  String memberEmail) {
        return memberService.deleteMember(memberEmail);
    }

    // accesstoken 재발급
    @GetMapping("/reissue")
    public TokenResponse reissue(@AuthenticationPrincipal MemberDetail memberDetail) throws JsonProcessingException {
        MemberResponse memberResponse = MemberResponse.of(memberDetail.getMember());
        return jwtProvider.reissueAtk(memberResponse);
    }

    @PostMapping("/mypage")
    public Map<String, Object> getAccountList(@RequestBody String memberEmail){
        Map<String, Object> result = new HashMap<>();
        result.put("info", memberService.myPageInfo(memberEmail));
        result.put("missionList", memberMissionService.getMyPageMissionList(memberEmail));
        return result;
    }
}
