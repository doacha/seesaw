package com.doacha.seesaw.controller;

import com.doacha.seesaw.jwt.JwtProvider;
import com.doacha.seesaw.jwt.MemberDetail;
import com.doacha.seesaw.jwt.TokenResponse;
import com.doacha.seesaw.model.dto.account.AccountResponse;
import com.doacha.seesaw.model.dto.account.BalanceTransferRequest;
import com.doacha.seesaw.model.dto.account.CreateAccountToSeesawRequest;
import com.doacha.seesaw.model.dto.mission.MissionMemberResponse;
import com.doacha.seesaw.model.dto.user.*;
import com.doacha.seesaw.model.service.MemberMissionService;
import com.doacha.seesaw.model.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.result.view.RedirectView;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin(origins="*", allowedHeaders = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT})
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMissionService memberMissionService;
    private final JwtProvider jwtProvider;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";


    // 회원가입
    @PostMapping("/signup")
    public MemberResponse signUp(@RequestBody SignUpRequest signUpRequest) throws MessagingException, UnsupportedEncodingException {
        return memberService.signUp(signUpRequest);
    }

    // 이메일 인증
    @GetMapping("/registerEmail")
    public RedirectView emailConfirm(@RequestParam String memberEmail, String key)throws Exception{
        log.info("인증 요청 온 이메일: " + memberEmail);
        memberService.memberAuth(memberEmail, key);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("https://j9a409.p.ssafy.io/login");
        return redirectView;
    }
    // 로그인
    @PostMapping("/login")
    public MemberResponse login(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
        MemberResponse memberResponse = memberService.login(loginRequest);
//        TokenResponse tokenResponse = jwtProvider.createTokensByLogin(memberResponse)
        return memberResponse;
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
//    @PostMapping(value = "/modify",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)//,  produces = "application/json; charset=utf-8")
//    public MyInfoResponse changeInfo(HttpServletRequest request, @RequestPart (value="image") MultipartFile image, @RequestPart (value="changeInfoRequest") ChangeInfoRequest changeInfoRequest) throws IOException
    @PostMapping(value = "/modify", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MyInfoResponse changeInfo(@RequestPart(value = "image", required = false) MultipartFile image, @RequestPart(value = "changeInfoRequest") ChangeInfoRequest changeInfoRequest) throws IOException{

        return memberService.changeInfo(image, changeInfoRequest);
    }

    // 회원 정보 수정 이미지 변경 없을 때
    @PostMapping(value = "/modify-noimg")
    public MyInfoResponse changeInfoNoImage(@RequestBody ChangeInfoRequest changeInfoRequest) {
        return memberService.changeInfoNoImage(changeInfoRequest);
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
    public Map<String, Object> getAccountList(@RequestBody String memberEmail){
        return memberService.getAccountList(memberEmail);
    }

    // 적금 계좌 개설
    @PostMapping("/create-account")
    public ResponseEntity<?> createAccount(@RequestBody CreateAccountToSeesawRequest createAccountToSeesawRequest){
        if(memberService.checkCertifiedAccount(createAccountToSeesawRequest.getMemberEmail())) {
            return memberService.createAccount(createAccountToSeesawRequest);
        }
        return ResponseEntity.ok(false);
    }

    @PostMapping("/balance-transfer")
    public ResponseEntity<?> balanceTransfer(@RequestBody BalanceTransferRequest balanceTransferRequest){
        return memberService.balanceTransfer(balanceTransferRequest);
    }

    // 테스트용 이미지 업로드 코드
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadImage(@RequestPart(value = "image", required = false) MultipartFile image) throws IOException{
        memberService.uploadImage(image, 0);
    }

    // 시소 뱅크 연동
    @Operation(summary = "시소 뱅크 연동", description = "시소 뱅크 연동 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "시소 뱅크 연동 성공"),
            @ApiResponse(responseCode = "500", description = "시소 뱅크 연동 실패 - 서버 오류")
    })
    @PostMapping("/link-seesawbank")
    public ResponseEntity<?> linkMemberToSeesawBank(@RequestBody LinkMemberToSeesawBankRequest request) {
        log.info("시소 뱅크 연동");
        try {
            memberService.linkMemberToSeesawBank(request);
            log.info("시소 뱅크 연동 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("시소 뱅크 연동 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
