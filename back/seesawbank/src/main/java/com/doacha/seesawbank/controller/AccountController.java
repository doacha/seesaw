package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.model.dto.account.AccountListResponse;
import com.doacha.seesawbank.model.dto.account.AccountResponse;
import com.doacha.seesawbank.model.dto.account.CreateAccountRequest;
import com.doacha.seesawbank.model.dto.account.DeleteAccountRequest;
import com.doacha.seesawbank.model.service.AccountService;
import com.doacha.seesawbank.model.service.AccountTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/check")
    public int checkRecentBalance(@RequestBody String accountNum){
        return accountTransactionService.checkRecentBalance(accountNum);
    }

    @PutMapping("/delete")
    public boolean deleteAccount(@RequestBody DeleteAccountRequest deleteAccountRequest) {
        return accountService.deleteAccount(deleteAccountRequest);
    }

    @PostMapping("/accounts")
    public List<AccountListResponse> getAccountList(@RequestBody String memberId){
        return accountService.getAccountList(memberId);
    }
}
