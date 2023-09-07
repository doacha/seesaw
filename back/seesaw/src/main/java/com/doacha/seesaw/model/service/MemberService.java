package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.model.dto.LoginRequest;
import com.doacha.seesaw.model.dto.SignUpRequest;
import com.doacha.seesaw.model.dto.MemeberResponse;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.repository.MemberRepository;
//import jakarta.transaction.Transactional;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    // TODO: 나중에 PasswordEncoder 다시 설정 해주기
//    private final PasswordEncoder passwordEncoder;

    @Transactional
    public MemeberResponse signUp(SignUpRequest signUpRequest) {
        boolean isExist = memberRepository
                .existsByMemberEmail(signUpRequest.getMemberEmail());
        if (isExist) throw new BadRequestException("이미 존재하는 이메일입니다.");
//        String encodedPassword = passwordEncoder.encode(signUpRequest.getMemberPassword());

        Member member = new Member(
                signUpRequest.getMemberEmail(),
                signUpRequest.getMemberPassword(),
//                encodedPassword,
                signUpRequest.getMemberName(),
                signUpRequest.getMemberNickname(),
                signUpRequest.getMemberBirth(),
                signUpRequest.isMemberGender(),
                false,
                0 // 처음엔 미인증(0)으로
                );

        member = memberRepository.save(member);
        return MemeberResponse.of(member);
    }

    @Transactional(readOnly = true)
    public MemeberResponse login(LoginRequest loginRequest) {
        Member member = memberRepository
                .findByMemberEmail(loginRequest.getMemberEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        //일단 되는지 확인을 위한 임시 비밀번호 확인
        boolean matches = false;
        if(member.getMemberPassword().equals(loginRequest.getMemberPassword())) matches = true;

        //아래 코드가 passwordencoder 사용한거 이거로 바꿔야함
//        boolean matches = passwordEncoder.matches(
//                loginRequest.getMemberPassword(),
//                member.getMemberPassword());
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

        return MemeberResponse.of(member);
    }
}
