package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.model.dto.SavingRequest;
import com.doacha.seesaw.model.dto.account.AccountResponse;
import com.doacha.seesaw.model.dto.account.CreateAccountRequest;
import com.doacha.seesaw.model.dto.account.CreateAccountToSeesawRequest;
import com.doacha.seesaw.model.dto.user.*;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.redis.RedisDao;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MemberRepository;
//import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Optional;

import static org.hibernate.sql.ast.SqlTreeCreationLogger.LOGGER;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMissionRepository memberMissionRepository;
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

    // 계좌 체크
    @Transactional(readOnly = true)
    public boolean checkCertifiedAccount(String memberEmail) {
        Member member = memberRepository
                .findByMemberEmail(memberEmail)
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        if(member.getMemberBankId()!=null) return true;
        else return false;
    }

    // 계좌 개설
    @Transactional
    public ResponseEntity<AccountResponse> createAccount(CreateAccountToSeesawRequest createAccountToSeesawRequest) {
        Member member = memberRepository
                .findByMemberEmail(createAccountToSeesawRequest.getMemberEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        // 각각의 적금건에 대해 이체 요청 하기
        CreateAccountRequest request = CreateAccountRequest.builder()
                .accountName(createAccountToSeesawRequest.getAccountName())
                .memberId(member.getMemberBankId())
                .accountPassword(createAccountToSeesawRequest.getAccountPassword())
                .build();

        URI uri = UriComponentsBuilder
//                .fromUriString("http://localhost:8081")
                .fromUriString("http://j9a409.p.ssafy.io:8081")
                .path("/seesawbank/account/create")
                .build()
                .toUri();

        RequestEntity<CreateAccountRequest> requestEntity = RequestEntity
                .post(uri)
                .body(request);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<AccountResponse> result = restTemplate.exchange(requestEntity, AccountResponse.class);
        return result;
    }

    // 백에 계좌 리스트 api 요청
    //1.get방식 요청
//    public Object seesawbankAccounts (String memberEmail){
//
//
//        //URI를 빌드한다
//        URI uri = UriComponentsBuilder
//                .fromUriString("http://localhost:8081")
//                .path("/api/server/hello")
//                .encode(Charset.defaultCharset())
//                .build()
//                .toUri();
//        System.out.println(uri.toString());
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        //String result = restTemplate.getForObject(uri, String.class);
//        //getForEntity는 응답을 ResponseEntity로 받을 수 있도록 해준다 .
//        //파라미터 첫번째는 요청 URI 이며 , 2번째는 받을 타입
//        ResponseEntity<UserResponse> result = restTemplate.getForEntity(uri,UserResponse.class);
//
//        System.out.println(result.getStatusCode());
//        System.out.println(result.getBody());
//
//        return result.getBody();
//    }



    // 로그아웃
    @Transactional
    public void logout() {
        //Token에서 로그인한 사용자 정보 get해 로그아웃 처리
        Member member = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    }

    // 이메일 체크
    @Transactional
    public boolean checkEmail(String memberEmail) {
        boolean isExist = memberRepository
                .existsByMemberEmail(memberEmail);
        if (isExist) throw new BadRequestException("이미 존재하는 이메일입니다.");

        return true;
    }

    // 닉네임 체크
    // 이메일 체크
    @Transactional
    public boolean checkNickname(String memberNickname) {
        boolean isExist = memberRepository
                .existsByMemberNickname(memberNickname);
        if (isExist) throw new BadRequestException("이미 존재하는 닉네임입니다.");

        return true;
    }


    // 마이페이지 내 정보
    @Transactional
    public MyPageInfoResponse myPageInfo(String memberEmail) {
        log.info("사용자 이메일 - ", memberEmail);
        Member member = memberRepository
                .findByMemberEmail(memberEmail)
                .orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));

       MyPageInfoResponse myPageInfoResponse = new MyPageInfoResponse(
               member.getMemberNickname(),
               member.getMemberImgUrl(),
               memberMissionRepository.countMissionsByMemberIdAndMissionStatus(memberEmail, 2),
               memberMissionRepository.countMissionsByMemberIdAndMissionStatus(memberEmail, 3),
               memberMissionRepository.countMissionsByMemberIdAndMissionStatus(memberEmail, 1)
       );
        return myPageInfoResponse;
    }

    // 회원 정보 수정
    @Transactional
    public MyInfoResponse changeInfo(ChangeInfoRequest changeInfoRequest) {

        Optional<Member> member = memberRepository.findByMemberEmail(changeInfoRequest.getMemberEmail());

        Member update;

        if(changeInfoRequest.getMemberNewPassword()!=null || !"".equals(changeInfoRequest.getMemberNewPassword())){ // 비번 새로 바꾸려고 하면
            if(!passwordEncoder.matches( changeInfoRequest.getMemberPassword(), member.get().getMemberPassword())){ // 비번 확인
                throw new BadRequestException("비밀번호를 확인하세요."); // 비번 다르면 익셉션
            }
            member.get().builder().memberPassword(changeInfoRequest.getMemberNewPassword()).build();
        }

        update = Member.builder()
                .memberEmail(member.get().getMemberEmail())
                .memberPassword(member.get().getMemberPassword())
                .memberBirth(changeInfoRequest.getMemberBirth())
                .memberName(changeInfoRequest.getMemberName())
                .memberGender(changeInfoRequest.isMemberGender())
                .memberNickname(changeInfoRequest.getMemberNickname())
                .memberImgUrl(changeInfoRequest.getMemberImgUrl())
                .memberPhoneNumber(changeInfoRequest.getMemberPhoneNumber())
                .build();

        memberRepository.save(update);

        return MyInfoResponse.of(member.get());
    }

    // 회원 탈퇴 TODO : 진짜 탈퇴만 해놨음 조건 추가해야 함
    @Transactional
    public boolean deleteMember(String memberEmail) {

        Optional<Member> member = memberRepository.findByMemberEmail(memberEmail);

        System.out.println("이메일!!" + member.get().getMemberEmail());
//        member.get().builder().memberIsWithdrawal(false).build();

        Member update = Member.builder()
                .memberEmail(member.get().getMemberEmail())
                .memberPassword(member.get().getMemberPassword())
                .memberBirth(member.get().getMemberBirth())
                .memberName(member.get().getMemberName())
                .memberGender(member.get().isMemberGender())
                .memberNickname(member.get().getMemberNickname())
                .memberImgUrl(member.get().getMemberImgUrl())
                .memberPhoneNumber(member.get().getMemberPhoneNumber())
                .memberState(2) // 2가 탈퇴 상태
                .memberMainAccount(member.get().getMemberMainAccount())
                .memberBankId(member.get().getMemberBankId())
                .build();

        memberRepository.save(update);
        return true;
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
