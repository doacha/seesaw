package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.exception.BadRequestException;
import com.doacha.seesawbank.exception.NoContentException;
import com.doacha.seesawbank.model.dto.account.CheckAuthenticationRequest;
import com.doacha.seesawbank.model.service.AccountTransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account-transactional")
@CrossOrigin("*")
@Slf4j
public class AccountTransactionController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    AccountTransactionService accountTransactionService;


    // 1원 인증 보내기
    @Operation( summary = "1원 인증 보내기", description = "계좌 번호 입력받아서 해당 계좌에 1원 보낸후 거래번호 반환하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "1원 보내기 성공"),
            @ApiResponse(responseCode = "204", description = "1원 보내기 실패 - 존재하지 않는 계좌"),
            @ApiResponse(responseCode = "500", description = "1원 보내기 실패 - 서버 오류")
    })
    @PostMapping ("/send")
    public ResponseEntity<?> sendAuthentication(@RequestBody String accountNum) {
        log.info(accountNum+"로 1원 전송");
        try {
            String accountDealNum = accountTransactionService.sendAuthentication(accountNum);
            log.info("1원 전송 성공");
            return new ResponseEntity<String>(accountDealNum, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("1원 보내기 실패 - 존재하지 않는 계좌");
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("1원 보내기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 1원 인증 확인
    @Operation( summary = "1원 인증 확인", description = "계좌 번호 & 1원과 함께 전송된 인증번호 입력받아서 본인인증을 하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "1원 인증 성공"),
            @ApiResponse(responseCode = "401", description = "1원 인증 실패 - 잘못된 인증번호"),
            @ApiResponse(responseCode = "500", description = "1원 인증 실패 - 서버 오류")
    })
    @PostMapping ("/check")
    public ResponseEntity<?> checkAuthentication(@RequestBody CheckAuthenticationRequest request) {
        log.info("1원 인증 확인");
        try {
            accountTransactionService.checkAuthentication(request);
            log.info("1원 인증 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (BadRequestException e) {
            log.info("1원 인증 실패 - 잘못된 인증번호");
            return new ResponseEntity<String>(FAIL, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            log.info("1원 인증 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
