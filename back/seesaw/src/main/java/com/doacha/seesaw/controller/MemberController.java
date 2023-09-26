package com.doacha.seesaw.controller;

import com.doacha.seesaw.jwt.JwtProvider;
import com.doacha.seesaw.jwt.MemberDetail;
import com.doacha.seesaw.jwt.TokenResponse;
import com.doacha.seesaw.model.dto.account.AccountResponse;
import com.doacha.seesaw.model.dto.account.CreateAccountToSeesawRequest;
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
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin(origins="*", allowedHeaders = "*")
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

    // 이메일 중복확인
    @PostMapping("/emailcheck")
    public boolean checkEmail(@RequestBody String memberEmail) {
        return memberService.checkEmail(memberEmail);
    }

    // 닉네임 중복확인
    @PostMapping("/nicknamecheck")
    public boolean checkNickname(@RequestBody String memberNickname) {
        return memberService.checkNickname(memberNickname);
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

    // 마이 페이지 내 정보
    @PostMapping("/mypage")
    public Map<String, Object> getMyInfoAndMissionList(@RequestBody String memberEmail){
        Map<String, Object> result = new HashMap<>();
        result.put("info", memberService.myPageInfo(memberEmail));
        result.put("missionList", memberMissionService.getMyPageMissionList(memberEmail));
        return result;
    }

    // 마이페이지 내 계좌
    @PostMapping("/mypage-account")
    public ResponseEntity<?> getAccountList(@RequestBody String memberEmail){
        if(memberService.checkCertifiedAccount(memberEmail)) {
            // 시소뱅크에 계좌 리스트 불러오는 api 호출하고 담아서 리턴
//            Object response = memberService
        }
        return ResponseEntity.ok(false);
    }

    // 적금 계좌 개설
    @PostMapping("/create-account")
    public ResponseEntity<AccountResponse> createAccount(@RequestBody CreateAccountToSeesawRequest createAccountToSeesawRequest){
        return memberService.createAccount(createAccountToSeesawRequest);
//        return ResponseEntity.ok(false);
    }
}
