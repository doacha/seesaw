package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.model.dto.account.AccountResponse;
import com.doacha.seesawbank.model.dto.account.CreateAccountRequest;
import com.doacha.seesawbank.model.service.AccountService;
import com.doacha.seesawbank.model.service.AccountTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final AccountTransactionService accountTransactionService;

    @PostMapping("/create")
    public AccountResponse createAccount(@RequestBody CreateAccountRequest createAccountRequest) {
        return accountService.createAccount(createAccountRequest);
    }

    @PostMapping("/checkRecentBalance")
    public int checkRecentBalance(@RequestBody String accountNum){
        return accountTransactionService.checkRecentBalance(accountNum);
    }
}
