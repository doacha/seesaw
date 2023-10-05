package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.exception.BadRequestException;
import com.doacha.seesawbank.exception.NoContentException;
import com.doacha.seesawbank.model.dto.account.*;
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

    // 계좌 이체 전 확인
    @PostMapping ("/check-transfer")
    public AccountTransferResponse checkAccountTransfer(@RequestBody CheckAccountTransactionRequest checkAccountTransactionRequest) {
        return accountTransactionService.checkAccountTransfer(checkAccountTransactionRequest);
    }

    // 계좌 이체
    @PostMapping ("/transfer")
    public ResponseEntity<?> accountTransfer(@RequestBody AccountTransferRequest accountTransferRequest) {
        try {
            AccountTransferResponse response = accountTransactionService.accountTransfer(accountTransferRequest);
            log.info("계좌 이체 성공");
            return new ResponseEntity<AccountTransferResponse>(response, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("계좌 이체 실패 - {} 존재하지 않음", e.getMessage());
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (BadRequestException e) {
            log.info("계좌 이체 실패 - {}", e.getMessage());
            if(e.getMessage().equals("잔액 부족")) return new ResponseEntity<String>("No Balance", HttpStatus.BAD_REQUEST);
            else return new ResponseEntity<String>("Wrong Password", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.info("계좌 이체 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 1원 인증 전송
    @Operation( summary = "1원 인증 전송", description = "계좌 번호 입력받아서 해당 계좌에 1원 보낸후 거래번호 반환하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "1원 인증 전송 성공"),
            @ApiResponse(responseCode = "204", description = "1원 인증 전송 실패 - 존재하지 않는 계좌"),
            @ApiResponse(responseCode = "500", description = "1원 인증 전송 실패 - 서버 오류")
    })
    @PostMapping ("/send")
    public ResponseEntity<?> sendAuthentication(@RequestBody String accountNum) {
        log.info(accountNum+"로 1원 인증 전송");
        try {
            String accountDealNum = accountTransactionService.sendAuthentication(accountNum);
            log.info("1원 인증 전송 성공");
            return new ResponseEntity<String>(accountDealNum, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("1원 보인증 전송내기 실패 - 존재하지 않는 계좌");
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("1원 인증 전송 실패 - 서버 오류");
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
            String memberId = accountTransactionService.checkAuthentication(request);
            log.info("1원 인증 성공");
            return new ResponseEntity<String>(memberId, HttpStatus.OK);
        } catch (BadRequestException e) {
            log.info("1원 인증 실패 - 잘못된 인증번호");
            return new ResponseEntity<String>(FAIL, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            log.info("1원 인증 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 적금 계좌 이체
    @Operation( summary = "적금 계좌 이체", description = "일반계좌에서 적금계좌로 이체하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "적금 계좌 이체 성공"),
            @ApiResponse(responseCode = "500", description = "적금 계좌 이체 - 서버 오류")
    })
    @PostMapping ("/saving")
    public ResponseEntity<?> savingAccountTransfer(@RequestBody SavingAccountTransferRequest savingAccountTransferRequest) {
        log.info("적금 계좌 이체");
        try {
            accountTransactionService.savingAccountTransfer(savingAccountTransferRequest);
            log.info("적금 계좌 이체 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (BadRequestException e) {
            log.info("적금 계좌 이체 실패 - 잔액 부족");
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.info("적금 계좌 이체 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
