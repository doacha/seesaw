package com.doacha.seesawbank.model.service;

import com.doacha.seesawbank.exception.BadRequestException;
import com.doacha.seesawbank.model.dto.member.LoginRequest;
import com.doacha.seesawbank.model.dto.member.MemberResponse;
import com.doacha.seesawbank.model.dto.member.SignUpRequest;
import com.doacha.seesawbank.model.entity.Member;
import com.doacha.seesawbank.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @Transactional
    public MemberResponse signUp(SignUpRequest signUpRequest) {
        boolean isExist = memberRepository
                .existsByMemberId(signUpRequest.getMemberId());
        if (isExist) throw new BadRequestException("이미 존재하는 이메일입니다.");
        String encodedPassword = passwordEncoder.encode(signUpRequest.getMemberPassword());

        Member member = new Member(
                signUpRequest.getMemberId(),
                encodedPassword,
                signUpRequest.getMemberName()
        );

        member = memberRepository.save(member);
        return MemberResponse.of(member);
    }

    // 로그인
    @Transactional(readOnly = true)
    public MemberResponse login(LoginRequest loginRequest) {
        Member member = memberRepository
                .findByMemberId(loginRequest.getMemberId())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        boolean matches = passwordEncoder.matches(
                loginRequest.getMemberPassword(),
                member.getMemberPassword());
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

        return MemberResponse.of(member);
    }

}
