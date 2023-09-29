package com.doacha.seesawbank.controller;

import com.doacha.seesawbank.model.dto.account.*;
import com.doacha.seesawbank.model.service.AccountService;
import com.doacha.seesawbank.model.service.AccountTransactionService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@CrossOrigin(origins="*", allowedHeaders = "*")
@Slf4j
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

    @PostMapping("/accountdetail")
    public List<AccountTransactionListResponse> getAccountDetail(@RequestBody AccountNumRequest accountNumRequest, @Parameter(hidden = true)@PageableDefault(size=10, sort="accountTransactionTime",direction = Sort.Direction.DESC) Pageable pageable){
        return accountService.getAccountDetail(accountNumRequest, pageable);
    }

}
