package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.model.dto.cardTransaction.SpendingResponse;
import com.doacha.seesawbank.model.service.CardTransactionService;
import io.swagger.v3.oas.annotations.tags.Tag;
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



    @GetMapping("/list/{memberId}")
    public ResponseEntity<?> sendSpending(@PathVariable String memberId){
        log.info("호출됨");
        try {
            List<SpendingResponse> list = cardTransactionService.findAllByMemberId(memberId);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("fail",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
