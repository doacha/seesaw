package com.doacha.seesawbank.model.service;

import com.doacha.seesawbank.exception.BadRequestException;
import com.doacha.seesawbank.exception.NoContentException;
import com.doacha.seesawbank.model.dto.account.CheckAuthenticationRequest;
import com.doacha.seesawbank.model.entity.Account;
import com.doacha.seesawbank.model.entity.AccountTransaction;
import com.doacha.seesawbank.repository.AccountRepository;
import com.doacha.seesawbank.repository.AccountTransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@Slf4j
public class AccountTransactionService {

    @Autowired
    AccountTransactionRepository accountTransactionRepository;

    @Autowired
    AccountRepository accountRepository;

    // 1원 인증 보내기
    public String sendAuthentication (String accountNum){
        Optional<Account> account = accountRepository.findById(accountNum);
        // 존재 하지 않는 계좌인 경우 예외 처리
        if(!account.isPresent()) throw new NoContentException("계좌");

        String accountDealNum = createAccountDealNum();//계좌 거래 번호 생성
        Optional<AccountTransaction> recentTransaction = accountTransactionRepository.findTopByAccountOrderByAccountTransactionTimeDesc(account.get());
        int recentBalance = 0;
        if(!recentTransaction.isPresent()) recentBalance = 0; //이전 거래 내역 없으면 기존 잔액 0
        else recentBalance = recentTransaction.get().getAccountBalance();// 이전 거래 내역 있으면 최근 거래의 잔액 가져오기

        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        AccountTransaction accountTransaction = AccountTransaction.builder()
                .account(account.get())
                .accountDealNum(accountDealNum)
                .accountTransactionName(createAuthenticationNum())
                .accountBalance(recentBalance+1)
                .accountTransactionTime(Timestamp.valueOf(now))
                .accountApprovalAmount(1)
                .accountIsDeposit(true)
                .build();

        accountTransactionRepository.save(accountTransaction);

        return accountDealNum;
    }

    // 거래 번호 만들기
    private String createAccountDealNum() {
        log.info("거래 번호 생성");
        String accountDealNum = "T"+RandomStringUtils.random(8, true, true);
        while(accountTransactionRepository.existsById(accountDealNum)){
            log.info("동일한 거래 번호 존재 - 거래 번호 재생성");
            accountDealNum = "T"+RandomStringUtils.random(8, true, true);
        }
        log.info("거래 번호 생성 성공");
        return accountDealNum;
    }

    // 1원 인증 인증번호 만들기
    private String createAuthenticationNum() {
        log.info("1원 인증 인증번호 생성");
        String randomNum = RandomStringUtils.random(4, false, true);
        return randomNum;
    }

    // 1원 인증 확인
    public void checkAuthentication (CheckAuthenticationRequest request){
        Optional<AccountTransaction> accountTransaction = accountTransactionRepository.findById(request.getAccountDealNum());

        String accountTransactionName = accountTransaction.get().getAccountTransactionName();
        log.info("인증 번호: {}", accountTransactionName);
        String authenticationNum = request.getAuthenticationNum();
        log.info("입력한 번호: {}", authenticationNum);
        if(!accountTransactionName.equals(authenticationNum)) throw new BadRequestException("인증번호 불일치");
    }
}
