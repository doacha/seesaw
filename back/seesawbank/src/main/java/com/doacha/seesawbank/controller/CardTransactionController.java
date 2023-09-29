package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.model.dto.cardTransaction.GetCardTransactionRequest;
import com.doacha.seesawbank.model.dto.cardTransaction.GetCardTransactionResponse;
import com.doacha.seesawbank.model.service.CardTransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cardtransaction")
@CrossOrigin("*")
@Slf4j

public class CardTransactionController {

    @Autowired
    CardTransactionService cardTransactionService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

//    @GetMapping("/list")
//    public ResponseEntity<?> sendSpending(@RequestBody String memberId){
//        try {
//            List<SpendingResponse> list = cardTransactionService.findAllByMemberId(memberId);
//            return new ResponseEntity<List<SpendingResponse>>(list, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<String>("fail",HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    // 카드 거래 내역 조회
    @Operation( summary = "카드 거래내역 조회", description = "사용자 아이디, 조회 시작일시, 조회 종료일시로 카드거래내역 조회하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "카드 거래내역 조회 성공"),
            @ApiResponse(responseCode = "500", description = "카드 거래내역 조회 실패 - 서버 오류")
    })
    @PostMapping ("/list")
    public ResponseEntity<?> getCardTransactionList(@RequestBody GetCardTransactionRequest getCardTransactionRequest) {
        log.info("카드 거래내역 조회");
        try {
            List<GetCardTransactionResponse> list = cardTransactionService.getCardTransactionList(getCardTransactionRequest);
            log.info("카드 거래내역 조회 성공");
            return new ResponseEntity<List<GetCardTransactionResponse>>(list, HttpStatus.OK);
        }  catch (Exception e) {
            log.info("카드 거래내역 조회 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
