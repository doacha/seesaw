package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.exception.CustomException;
import com.doacha.seesaw.mail.TempKey;
import com.doacha.seesaw.model.dto.account.*;
import com.doacha.seesaw.model.dto.user.*;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.MemberMission;
import com.doacha.seesaw.redis.RedisDao;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MemberRepository;
//import jakarta.transaction.Transactional;
import com.doacha.seesaw.repository.SpendingRepository;
import com.doacha.seesaw.util.MailUtils;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final SpendingRepository spendingRepository;
    private final MemberMissionRepository memberMissionRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisDao redisDao;

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${seesawBank_api}")
    private String seesawBank_api;

    // 회원가입
    @Transactional
    public MemberResponse signUp(SignUpRequest signUpRequest) throws MessagingException, UnsupportedEncodingException {
        boolean isExist = memberRepository
                .existsByMemberEmail(signUpRequest.getMemberEmail());
        if (isExist) throw new BadRequestException("이미 존재하는 이메일입니다.");
        String encodedPassword = passwordEncoder.encode(signUpRequest.getMemberPassword());

        // 이메일 인증 번호 생성
        String key = new TempKey().getKey(50,false);

        Member member = new Member(
                signUpRequest.getMemberEmail(),
                encodedPassword,
                signUpRequest.getMemberName(),
                signUpRequest.getMemberNickname(),
                signUpRequest.getMemberBirth(),
                signUpRequest.isMemberGender(),
                false,
                0, // 처음엔 미인증(0)으로
                key
                );

        member = memberRepository.save(member); // 회원가입(인증 전)

        //인증 관련 메일을 보내자
        MailUtils sendMail = new MailUtils(javaMailSender);
        sendMail.setSubject("[시소 이메일 인증 메일 입니다.]"); //메일 제목
        sendMail.setText(
                "<h1>시소 이메일 인증</h1>" +
                        "<br/>"+member.getMemberName()+"님 "+
                        "<br/>시소에 가입해주셔서 감사합니다."+
                        "<br/>아래 [이메일 인증 확인]을 눌러주세요."+
                        "<a href='http://j9a409.p.ssafy.io:8080/seesaw/member/registerEmail?memberEmail=" + member.getMemberEmail() +
//                        "<a href='https://j9a409.p.ssafy.io/seesaw/member/registerEmail?memberEmail=" + member.getMemberEmail() +
                        "&key=" + key +
                        "' target='_blenk'>이메일 인증 확인</a>");
        sendMail.setFrom("doriarichacha@gmail.com", "시소");
        sendMail.setTo(member.getMemberEmail());
        sendMail.send();
        return MemberResponse.of(member);
    }

    // 이메일 인증
    @Transactional
    public void memberAuth(String memberEmail, String key) throws Exception{
        log.info("멤버 어스까지 왔습니다.");
        Optional<Member> member = memberRepository.findByMemberEmailAndMemberAuthKey(memberEmail, key);

        Member update;

        update = Member.builder()
                .memberEmail(member.get().getMemberEmail())
                .memberPassword(member.get().getMemberPassword())
                .memberBirth(member.get().getMemberBirth())
                .memberName(member.get().getMemberName())
                .memberGender(member.get().isMemberGender())
                .memberNickname(member.get().getMemberNickname())
                .memberImgUrl(member.get().getMemberImgUrl())
                .memberPhoneNumber(member.get().getMemberPhoneNumber())
                .memberSavingAccount(member.get().getMemberSavingAccount())
                .memberMainAccount(member.get().getMemberMainAccount())
                .memberBankId(member.get().getMemberBankId())
                .memberAuthKey(member.get().getMemberAuthKey())
                .memberIsSocial(member.get().isMemberIsSocial())
                .memberState(1)
                .memberRefreshToken(member.get().getMemberRefreshToken())
                .build();

        memberRepository.save(update);
    }

    // 로그인
    @Transactional(readOnly = true)
    public MemberResponse login(LoginRequest loginRequest) {
        Member member = memberRepository
                .findByMemberEmail(loginRequest.getMemberEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        if(member.getMemberState()==0) throw new BadRequestException("이메일 인증 후 로그인을 진행해주세요");
        else if(member.getMemberState()!=1) throw new BadRequestException("탈퇴 혹은 휴면 계정입니다.");

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

        if(!"".equals(member.getMemberMainAccount()) || member.getMemberMainAccount()!=null) return true;
        else return false;
    }

    // 계좌 개설
    @Transactional
    public ResponseEntity<AccountResponse> createAccount(CreateAccountToSeesawRequest createAccountToSeesawRequest) {
        Member member = memberRepository
                .findByMemberEmail(createAccountToSeesawRequest.getMemberEmail())
                .orElseThrow(() -> new BadRequestException("아이디를 확인하세요."));

        CreateAccountRequest request = CreateAccountRequest.builder()
                .accountName(createAccountToSeesawRequest.getAccountName())
                .memberId(member.getMemberBankId())
                .accountPassword(createAccountToSeesawRequest.getAccountPassword())
                .build();

        URI uri = UriComponentsBuilder
                .fromUriString(seesawBank_api)
                .path("/account/create")
                .build()
                .toUri();

        RequestEntity<CreateAccountRequest> requestEntity = RequestEntity
                .post(uri)
                .body(request);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<AccountResponse> result = restTemplate.exchange(requestEntity, AccountResponse.class);

        Member update = Member.builder()
                .memberEmail(member.getMemberEmail())
                .memberPassword(member.getMemberPassword())
                .memberBirth(member.getMemberBirth())
                .memberName(member.getMemberName())
                .memberGender(member.isMemberGender())
                .memberNickname(member.getMemberNickname())
                .memberImgUrl(member.getMemberImgUrl())
                .memberPhoneNumber(member.getMemberPhoneNumber())
                .memberSavingAccount(result.getBody().getAccountNum()) // 적금 계좌 등록!
                .memberMainAccount(member.getMemberMainAccount())
                .memberBankId(member.getMemberBankId())
                .memberAuthKey(member.getMemberAuthKey())
                .memberIsSocial(member.isMemberIsSocial())
                .memberState(member.getMemberState())
                .memberRefreshToken(member.getMemberRefreshToken())
                .build();

        memberRepository.save(update);
        return result;
    }

    // 백에 계좌 리스트 api 요청
    public Map<String, Object> getAccountList (String memberEmail){

        Member member = memberRepository
                .findByMemberEmail(memberEmail)
                .orElseThrow(() -> new BadRequestException("아이디를 확인하세요."));

        URI uri = UriComponentsBuilder
                .fromUriString(seesawBank_api)
                .path("/account/accounts")
                .build()
                .toUri();

        RequestEntity<String> requestEntity = RequestEntity
                .post(uri)
                .body(member.getMemberBankId());

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List> result = restTemplate.exchange(requestEntity, List.class);
        Map<String, Object> map = new HashMap<>();

        map.put("accountList", result.getBody());
        map.put("mainAccount", memberRepository.findByMemberEmail(memberEmail).get().getMemberMainAccount());

        return map;
    }

    // 백에 예치금 이체 api 요청
    public ResponseEntity<AccountTransferResponse> balanceTransfer(BalanceTransferRequest balanceTransferRequest) throws CustomException {
        try {
            Member member = memberRepository
                    .findByMemberEmail(balanceTransferRequest.getMemberEmail())
                    .orElseThrow(() -> new BadRequestException("아이디를 확인하세요."));

            AccountTransferRequest accountTransferRequest = new AccountTransferRequest(
                    member.getMemberMainAccount(),
                    "457899-01-296336",
                    balanceTransferRequest.getAccountApprovalAmount(),
                    balanceTransferRequest.getAccountPassword()
            );

            URI uri = UriComponentsBuilder
                    .fromUriString(seesawBank_api)
                    .path("/account-transactional/transfer")
                    .build()
                    .toUri();

            RequestEntity<AccountTransferRequest> requestEntity = RequestEntity
                    .post(uri)
                    .body(accountTransferRequest);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<AccountTransferResponse> result = restTemplate.exchange(requestEntity, AccountTransferResponse.class);
            return result;
        } catch (HttpClientErrorException e) {
            // HTTP 오류 응답 처리
            if (e.getRawStatusCode() == 400) {
                String responseBody = e.getResponseBodyAsString();
                throw new BadRequestException(responseBody);
            }

            // 기타 예외 처리
            throw new CustomException("HTTP 오류: " + e.getRawStatusCode(), e);
        }
    }


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
        // 모든 미션에 해당하는 카테고리의 // 해당 미션 기간(1달?) 이전에 쓰던 금액 - 미션 기간 쓴 금액
        List<MemberMission> memberMissions = memberMissionRepository.findMemberMissionByMember(member);
        long sum = 0; long before = 0; long after = 0;
        // 카테고리 아이디, 이메일, 시작일, 끝일
        for( MemberMission mm : memberMissions){
            before = 0; after = 0;
            String str = mm.getMission().getMissionStartDate() + " 00:00:00.000";
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
            LocalDateTime startDateTime = LocalDateTime.parse(str, formatter);
            if(spendingRepository.findSumByPeriodAndCategory(mm.getMission().getMissionCategoryId(), memberEmail, startDateTime.minusDays(mm.getMission().getMissionPeriod()*mm.getMission().getMissionCurrentCycle()), startDateTime).isPresent()) {
                before = spendingRepository.findSumByPeriodAndCategory(mm.getMission().getMissionCategoryId(), memberEmail, startDateTime.minusDays(mm.getMission().getMissionPeriod()*mm.getMission().getMissionCurrentCycle()), startDateTime.minusDays(1)).get();
            }
            if(spendingRepository.findSumByPeriodAndCategory(mm.getMission().getMissionCategoryId(), memberEmail, startDateTime, startDateTime.plusDays(mm.getMission().getMissionPeriod()*mm.getMission().getMissionCurrentCycle())).isPresent()){
                after = spendingRepository.findSumByPeriodAndCategory(mm.getMission().getMissionCategoryId(), memberEmail, startDateTime, startDateTime.plusDays(mm.getMission().getMissionPeriod()*mm.getMission().getMissionCurrentCycle()-1)).get();
            }
            sum += before-after;
//            sum += spendingRepository.findSumByPeriodAndCategory(mm.getMission().getMissionCategoryId(), member.getMemberEmail(), dateAdd(mm.getMission().getMissionStartDate(), (-1)*mm.getMission().getMissionPeriod()*mm.getMission().getMissionCurrentCycle()), changeLocalDateTime(mm.getMission().getMissionStartDate()))
//                    -spendingRepository.findSumByPeriodAndCategory(mm.getMission().getMissionCategoryId(), member.getMemberEmail(), changeLocalDateTime(mm.getMission().getMissionStartDate()), dateAdd(mm.getMission().getMissionStartDate(), mm.getMission().getMissionPeriod()*mm.getMission().getMissionCurrentCycle()));
        }

       MyPageInfoResponse myPageInfoResponse = new MyPageInfoResponse(
               member.getMemberNickname(),
               member.getMemberImgUrl(),
               memberMissionRepository.countMissionsByMemberIdAndMissionStatus(memberEmail, 2),
               memberMissionRepository.countMissionsByMemberIdAndMissionStatus(memberEmail, 3),
               memberMissionRepository.countMissionsByMemberIdAndMissionStatus(memberEmail, 1),
               sum
       );
        return myPageInfoResponse;
    }
    // 시간 계산 법
//    Calendar cal1 = Calendar.getInstance();
//      cal1.add(Calendar.DATE, 6); // 일 계산
//      cal1.add(Calendar.MONTH, 4); // 월 연산
//      cal1.add(Calendar.DATE, -3); // 빼고 싶다면 음수 입력
//    Date date = new Date(cal1.getTimeInMillis());
//    public LocalDateTime dateAdd(Date startDate, int plus){
//        Calendar cal = Calendar.getInstance();
//        cal.setTime(startDate);
//        cal.add(Calendar.DATE, plus); // 일 계산
//        Date date = new Date(cal.getTimeInMillis());
//        return changeLocalDateTime(date);
//    }
//    public LocalDateTime changeLocalDateTime(Date date){
//        Instant instant = date.toInstant();
//        ZoneId zoneId = ZoneId.systemDefault();
//        LocalDateTime localDateTime = instant.atZone(zoneId).toLocalDateTime();
////        LocalDateTime localDateTime = date.toInstant() // Date -> Instant
////                .atZone(ZoneId.systemDefault()) // Instant -> ZonedDateTime
////                .toLocalDateTime();
//        return localDateTime;
//    }

    // 회원 정보 수정
    @Transactional
    public MyInfoResponse changeInfo(MultipartFile image, ChangeInfoRequest changeInfoRequest) throws IOException {

        Optional<Member> member = memberRepository.findByMemberEmail(changeInfoRequest.getMemberEmail());

        Member update;

        if(changeInfoRequest.getMemberPassword()==null || changeInfoRequest.getMemberPassword().isEmpty() || changeInfoRequest.getMemberNewPassword()==null || changeInfoRequest.getMemberNewPassword().isEmpty()){
            log.info("비밀번호 변경 X");
        }else{ // 비밀번호가 뭐라도 들어오면 비번 변경
            if(!passwordEncoder.matches( changeInfoRequest.getMemberPassword(), member.get().getMemberPassword())){ // 비번 확인
                throw new BadRequestException("비밀번호를 확인하세요."); // 비번 다르면 익셉션
            }
            String encodedPassword = passwordEncoder.encode(changeInfoRequest.getMemberNewPassword());
            update = Member.builder()
                    .memberEmail(member.get().getMemberEmail())
                    .memberPassword(encodedPassword)
                    .memberBirth(member.get().getMemberBirth())
                    .memberName(member.get().getMemberName())
                    .memberGender(member.get().isMemberGender())
                    .memberNickname(member.get().getMemberNickname())
                    .memberImgUrl(member.get().getMemberImgUrl())
                    .memberPhoneNumber(member.get().getMemberPhoneNumber())
                    .memberSavingAccount(member.get().getMemberSavingAccount())
                    .memberMainAccount(member.get().getMemberMainAccount())
                    .memberBankId(member.get().getMemberBankId())
                    .memberAuthKey(member.get().getMemberAuthKey())
                    .memberIsSocial(member.get().isMemberIsSocial())
                    .memberState(member.get().getMemberState())
                    .memberRefreshToken(member.get().getMemberRefreshToken())
                    .build();

            memberRepository.save(update);
        }

        // 이미지 처리
        String storedFileName = changeInfoRequest.getMemberImgUrl(); // 일단 기존 것으로 초기화
        // 이미지를 변경하려고 한다면 s3에 업로드하고 바꿔주기
        if(!image.isEmpty()) {
            storedFileName = s3Uploader.upload(image,"profile");
        }

        update = Member.builder()
                .memberEmail(member.get().getMemberEmail())
                .memberPassword(member.get().getMemberPassword())
                .memberBirth(changeInfoRequest.getMemberBirth())
                .memberName(changeInfoRequest.getMemberName())
                .memberGender(changeInfoRequest.isMemberGender())
                .memberNickname(changeInfoRequest.getMemberNickname())
                .memberImgUrl(storedFileName)
                .memberPhoneNumber(changeInfoRequest.getMemberPhoneNumber()) // 이 다음으로 추가됨
                .memberSavingAccount(member.get().getMemberSavingAccount())
                .memberMainAccount(member.get().getMemberMainAccount())
                .memberBankId(member.get().getMemberBankId())
                .memberAuthKey(member.get().getMemberAuthKey())
                .memberIsSocial(member.get().isMemberIsSocial())
                .memberState(member.get().getMemberState())
                .memberRefreshToken(member.get().getMemberRefreshToken())
                .build();

        memberRepository.save(update);

        return MyInfoResponse.of(member.get());
    }

    // 회원 정보 수정(이미지 변경 없을 때)
    @Transactional
    public MyInfoResponse changeInfoNoImage(ChangeInfoRequest changeInfoRequest){

        Optional<Member> member = memberRepository.findByMemberEmail(changeInfoRequest.getMemberEmail());

        Member update;

        if(changeInfoRequest.getMemberPassword()==null || changeInfoRequest.getMemberPassword().isEmpty() || changeInfoRequest.getMemberNewPassword()==null || changeInfoRequest.getMemberNewPassword().isEmpty()){
            log.info("비밀번호 변경 X");
        }else{ // 비밀번호가 뭐라도 들어오면 비번 변경
            if(!passwordEncoder.matches( changeInfoRequest.getMemberPassword(), member.get().getMemberPassword())){ // 비번 확인
                throw new BadRequestException("비밀번호를 확인하세요."); // 비번 다르면 익셉션
            }
            String encodedPassword = passwordEncoder.encode(changeInfoRequest.getMemberNewPassword());
            update = Member.builder()
                    .memberEmail(member.get().getMemberEmail())
                    .memberPassword(encodedPassword)
                    .memberBirth(member.get().getMemberBirth())
                    .memberName(member.get().getMemberName())
                    .memberGender(member.get().isMemberGender())
                    .memberNickname(member.get().getMemberNickname())
                    .memberImgUrl(member.get().getMemberImgUrl())
                    .memberPhoneNumber(member.get().getMemberPhoneNumber())
                    .memberSavingAccount(member.get().getMemberSavingAccount())
                    .memberMainAccount(member.get().getMemberMainAccount())
                    .memberBankId(member.get().getMemberBankId())
                    .memberAuthKey(member.get().getMemberAuthKey())
                    .memberIsSocial(member.get().isMemberIsSocial())
                    .memberState(member.get().getMemberState())
                    .memberRefreshToken(member.get().getMemberRefreshToken())
                    .build();

            memberRepository.save(update);
        }


        update = Member.builder()
                .memberEmail(member.get().getMemberEmail())
                .memberPassword(member.get().getMemberPassword())
                .memberBirth(changeInfoRequest.getMemberBirth())
                .memberName(changeInfoRequest.getMemberName())
                .memberGender(changeInfoRequest.isMemberGender())
                .memberNickname(changeInfoRequest.getMemberNickname())
                .memberImgUrl(member.get().getMemberImgUrl())
                .memberPhoneNumber(changeInfoRequest.getMemberPhoneNumber()) // 이 다음으로 추가됨
                .memberSavingAccount(member.get().getMemberSavingAccount())
                .memberMainAccount(member.get().getMemberMainAccount())
                .memberBankId(member.get().getMemberBankId())
                .memberAuthKey(member.get().getMemberAuthKey())
                .memberIsSocial(member.get().isMemberIsSocial())
                .memberState(member.get().getMemberState())
                .memberRefreshToken(member.get().getMemberRefreshToken())
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
                .memberSavingAccount(member.get().getMemberSavingAccount())
                .memberMainAccount(member.get().getMemberMainAccount())
                .memberBankId(member.get().getMemberBankId())
                .memberAuthKey(member.get().getMemberAuthKey())
                .memberIsSocial(member.get().isMemberIsSocial())
                .memberState(2) // 2가 탈퇴 상태
                .memberRefreshToken(member.get().getMemberRefreshToken())
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

    // 테스트용 이미지 업로드
    @Transactional
    public void uploadImage(MultipartFile image, int dirNum) throws IOException {
        // 이미지를 변경하려고 한다면 s3에 업로드하고 바꿔주기
        if(!image.isEmpty()) {
            if(dirNum == 0){
                s3Uploader.upload(image, "profile");
            }else if(dirNum == 1){
                s3Uploader.upload(image, "mission");
            }
        }

    }

    // 시소 뱅크 연동
    public void linkMemberToSeesawBank(LinkMemberToSeesawBankRequest request) {
        Member member = memberRepository.findById(request.getMemberEmail()).get();
        Member updatedMember = Member.builder()
                .memberEmail(request.getMemberEmail())
                .memberPassword(member.getMemberPassword())
                .memberName(member.getMemberName())
                .memberNickname(member.getMemberNickname())
                .memberBirth(member.getMemberBirth())
                .memberGender(member.isMemberGender())
                .memberPhoneNumber(member.getMemberPhoneNumber())
                .memberIsSocial(member.isMemberIsSocial())
                .memberState(member.getMemberState())
                .memberImgUrl(member.getMemberImgUrl())
                .memberRefreshToken(member.getMemberRefreshToken())
                .memberSavingAccount(member.getMemberSavingAccount())
                .memberMainAccount(request.getMemberMainAccount())// 대표 계정 저장
                .memberBankId(request.getMemberBankId())// 시소 뱅크 아이디 저장
                .memberAuthKey(member.getMemberAuthKey())
                .build();
        memberRepository.save(updatedMember);
    }
}
