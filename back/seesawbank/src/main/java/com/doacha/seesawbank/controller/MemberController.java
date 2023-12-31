package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.model.dto.member.LoginRequest;
import com.doacha.seesawbank.model.dto.member.MemberResponse;
import com.doacha.seesawbank.model.dto.member.SignUpRequest;
import com.doacha.seesawbank.model.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin(origins="*", allowedHeaders = "*")
public class MemberController {
    private final MemberService memberService;
    @PostMapping("/signup")
    public MemberResponse signUp(@RequestBody SignUpRequest signUpRequest) {
        return memberService.signUp(signUpRequest);
    }

    @PostMapping("/login")
    public MemberResponse login(@RequestBody LoginRequest loginRequest){
        return memberService.login(loginRequest);
    }
}
