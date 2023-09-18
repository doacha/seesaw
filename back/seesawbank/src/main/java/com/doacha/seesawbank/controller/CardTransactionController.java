package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.model.dto.SpendingResponse;
import com.doacha.seesawbank.model.service.CardTransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seesawbank/cardtransaction")
@CrossOrigin("*")
@Slf4j

public class CardTransactionController {
    @Autowired
    CardTransactionService cardTransactionService;
    @GetMapping("/list")
    public ResponseEntity<?> sendSpending(@RequestBody String userId){
        try {
            List<SpendingResponse> list = cardTransactionService.findAllByUserId(userId);
            return new ResponseEntity<List<SpendingResponse>>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("fail",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
