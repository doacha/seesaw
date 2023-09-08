package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.model.dto.user.LoginRequest;
import com.doacha.seesaw.model.dto.user.MyInfoResponse;
import com.doacha.seesaw.model.dto.user.SignUpRequest;
import com.doacha.seesaw.model.dto.user.MemberResponse;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.repository.MemberRepository;
//import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    // TODO: 나중에 PasswordEncoder 다시 설정 해주기
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @Transactional
    public MemberResponse signUp(SignUpRequest signUpRequest) {
        boolean isExist = memberRepository
                .existsByMemberEmail(signUpRequest.getMemberEmail());
        if (isExist) throw new BadRequestException("이미 존재하는 이메일입니다.");
        String encodedPassword = passwordEncoder.encode(signUpRequest.getMemberPassword());

        Member member = new Member(
                signUpRequest.getMemberEmail(),
                encodedPassword,
                signUpRequest.getMemberName(),
                signUpRequest.getMemberNickname(),
                signUpRequest.getMemberBirth(),
                signUpRequest.isMemberGender(),
                false,
                0 // 처음엔 미인증(0)으로
                );

        member = memberRepository.save(member);
        return MemberResponse.of(member);
    }

    // 로그인
    @Transactional(readOnly = true)
    public MemberResponse login(LoginRequest loginRequest) {
        Member member = memberRepository
                .findByMemberEmail(loginRequest.getMemberEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        // password encoder 사용해서 비밀번호 확인
        boolean matches = passwordEncoder.matches(
                loginRequest.getMemberPassword(),
                member.getMemberPassword());
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

        return MemberResponse.of(member);
    }

    // 비밀번호 확인
    @Transactional(readOnly = true)
    public MyInfoResponse confirmPassword(LoginRequest loginRequest) {
        Member member = memberRepository
                .findByMemberEmail(loginRequest.getMemberEmail())
                .orElseThrow(() -> new BadRequestException("회원 정보가 없습니다."));

        // password encoder 사용해서 비밀번호 확인
        boolean matches = passwordEncoder.matches(
                loginRequest.getMemberPassword(),
                member.getMemberPassword());
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

        return MyInfoResponse.of(member);
    }
}
