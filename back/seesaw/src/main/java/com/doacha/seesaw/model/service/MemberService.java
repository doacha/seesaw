package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.model.dto.user.*;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.redis.RedisDao;
import com.doacha.seesaw.repository.MemberRepository;
//import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    // TODO: 나중에 PasswordEncoder 다시 설정 해주기
    private final PasswordEncoder passwordEncoder;
    private final RedisDao redisDao;

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

    // 로그아웃
    @Transactional
    public void logout() {
        //Token에서 로그인한 사용자 정보 get해 로그아웃 처리
        Member member = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    }

    // 회원 정보 수정
    @Transactional(readOnly = true)
    public MyInfoResponse changeInfo(ChangeInfoRequest changeInfoRequest) {
//        Member member = memberRepository
//                .findByMemberEmail(changeInfoRequest.getMemberEmail())
//                .orElseThrow(() -> new BadRequestException("유저 정보가 없습니다."));

        Optional<Member> member = memberRepository.findByMemberEmail(changeInfoRequest.getMemberEmail());

        member.get().builder().memberEmail(member.get().getMemberEmail()).build();
        member.get().builder().memberName(member.get().getMemberName()).build();
        member.get().builder().memberBirth(member.get().getMemberBirth()).build();
        member.get().builder().memberGender(member.get().isMemberGender()).build();
        member.get().builder().memberNickname(member.get().getMemberNickname()).build();
        // TODO : 빨리 만들어!!!

        memberRepository.save(member.get());

//        if(changeInfoRequest.getMemberNewPassword()!=null){ // 비번 새로 바꾸려고 하면
//            if(!passwordEncoder.matches( changeInfoRequest.getMemberPassword(), member.getMemberPassword())){ // 비번 확인
//                throw new BadRequestException("비밀번호를 확인하세요."); // 비번 다르면 익셉션
//            }
//            member.setMemberPassword(changeInfoRequest.getMemberNewPassword()); // 비번 일치하면 비번 바꿔줌
//        }
//        member.setMemberName(changeInfoRequest.getMemberName());
//        member.setMemberEmail(changeInfoRequest.getMemberEmail());
//        member.setMemberBirth(changeInfoRequest.getMemberBirth());
//        member.setMemberGender(changeInfoRequest.isMemberGender());
//        member.setMemberNickname(changeInfoRequest.getMemberNickname());
//        member.setMemberImgUrl(changeInfoRequest.getMemberImgUrl());
//        member.setMemberPhoneNumber(changeInfoRequest.getMemberPhoneNumber());




        return MyInfoResponse.of(member.get());
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
