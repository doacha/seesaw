package com.doacha.seesawbank.model.service;

import com.doacha.seesawbank.exception.BadRequestException;
import com.doacha.seesawbank.exception.NoContentException;
import com.doacha.seesawbank.model.dto.account.*;
import com.doacha.seesawbank.model.entity.Account;
import com.doacha.seesawbank.model.entity.AccountTransaction;
import com.doacha.seesawbank.repository.AccountRepository;
import com.doacha.seesawbank.repository.AccountTransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // 계좌 잔액 확인
    @Transactional
    public int checkRecentBalance (String accountNum){
        // 내 계좌 찾기
        Optional<Account> accountTransfer = accountRepository.findAccountByAccountNum(accountNum);
        if(!accountTransfer.isPresent()) throw new NoContentException("없는 계좌");
        // 가장 최근 거래 내역
        Optional<AccountTransaction> recentTransaction = accountTransactionRepository.findTopByAccountOrderByAccountTransactionTimeDesc(accountTransfer.get());
        int recentBalance = 0;
        if(recentTransaction.isPresent()) recentBalance = recentTransaction.get().getAccountBalance(); // 이전 거래 내역 있으면 최근 거래의 잔액 가져오기

        return recentBalance;
    }

    // 계좌이체 전 확인
    @Transactional
    public AccountTransferResponse checkAccountTransfer (CheckAccountTransactionRequest catRequest){
        //받는 계좌(타인 계좌)
        Optional<Account> accountTransfer = accountRepository.findAccountByAccountNum(catRequest.getAccountTransactionNum());
        // 존재 하지 않는 계좌인 경우 예외 처리
        if(!accountTransfer.isPresent()) throw new NoContentException("없는 계좌");

        AccountTransferResponse accountTransferResponse = new AccountTransferResponse(
                catRequest.getAccountTransactionNum(),
                catRequest.getAccountApprovalAmount(),
                accountTransfer.get().getMember().getMemberName()
        );
        return accountTransferResponse;
    }

    // 계좌이체
    @Transactional
    public AccountTransferResponse accountTransfer (AccountTransferRequest atRequest){
        //보내는 계좌(내계좌)
        Optional<Account> account = accountRepository.findById(atRequest.getAccountNum());
        //받는 계좌(타인 계좌)
        Optional<Account> accountTransfer = accountRepository.findAccountByAccountNum(atRequest.getAccountTransactionNum());
        // 존재 하지 않는 계좌인 경우 예외 처리
        if(!account.isPresent()) throw new NoContentException("내 계좌");
        if(!accountTransfer.isPresent()) throw new NoContentException("없는 계좌");
        // 잔액 부족일 경우 예외처리
        if(account.get().getAccountRecentBalance()<atRequest.getAccountApprovalAmount()) throw new BadRequestException("잔액이 부족합니다.");

        String accountDealNum = createAccountDealNum();//계좌 거래 번호 생성

//        // 내 계좌 남은 금액
//        Optional<AccountTransaction> recentTransaction = accountTransactionRepository.findTopByAccountOrderByAccountTransactionTimeDesc(account.get());
//        int recentBalance = 0;
//        if(recentTransaction.isPresent()) recentBalance = recentTransaction.get().getAccountBalance(); // 이전 거래 내역 있으면 최근 거래의 잔액 가져오기
//
//        // 상대 계좌 남은 금액
//        Optional<AccountTransaction> recentTransferTransaction = accountTransactionRepository.findTopByAccountOrderByAccountTransactionTimeDesc(accountTransfer.get());
//        int recentTransferBalance = 0;
//        if(recentTransferTransaction.isPresent()) recentTransferBalance = recentTransferTransaction.get().getAccountBalance();// 이전 거래 내역 있으면 최근 거래의 잔액 가져오기

        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // 내 계좌 출금
        AccountTransaction accountTransaction = AccountTransaction.builder()
                .account(account.get())
                .accountDealNum(accountDealNum)
                .accountTransactionName(accountTransfer.get().getMember().getMemberName())
                .accountBalance(account.get().getAccountRecentBalance()-atRequest.getAccountApprovalAmount())
                .accountTransactionTime(Timestamp.valueOf(now))
                .accountApprovalAmount(atRequest.getAccountApprovalAmount()*(-1))
                .accountIsDeposit(false)
                .accountTransactionNum(atRequest.getAccountTransactionNum())
                .build();

        accountTransactionRepository.save(accountTransaction); // 계좌 거래 내역 생성
        updateRecentBalance(accountTransaction); // 계좌 잔액 업데이트


        // 상대 계좌 입금
        AccountTransaction accountTransferTransaction = AccountTransaction.builder()
                .account(accountTransfer.get())
                .accountDealNum(accountDealNum)
                .accountTransactionName(account.get().getMember().getMemberName())
                .accountBalance(accountTransfer.get().getAccountRecentBalance()+atRequest.getAccountApprovalAmount())
                .accountTransactionTime(Timestamp.valueOf(now))
                .accountApprovalAmount(atRequest.getAccountApprovalAmount())
                .accountIsDeposit(true)
                .build();

        accountTransactionRepository.save(accountTransferTransaction); // 상대 계좌 거래 내역 생성
        updateRecentBalance(accountTransferTransaction); // 상대 계좌 잔액 업데이트

        AccountTransferResponse accountTransferResponse = new AccountTransferResponse(
                accountTransaction.getAccountTransactionNum(),
                accountTransferTransaction.getAccountApprovalAmount(),
                accountTransaction.getAccountTransactionName()
        );

        return accountTransferResponse;
    }

    // 계좌 잔액 업데이트
    @Transactional
    public void updateRecentBalance(AccountTransaction accountTransaction) {
        Optional<Account> account = accountRepository.findAccountByAccountNum(accountTransaction.getAccount().getAccountNum());

        Account newAccount = Account.builder()
                .accountNum(account.get().getAccountNum())
                .member(account.get().getMember())
                .accountName(account.get().getAccountName())
                .accountType(account.get().getAccountType())
                .accountInterestRate(account.get().getAccountInterestRate())
                .accountStatus(account.get().getAccountStatus())
                .accountCreationTime(account.get().getAccountCreationTime())
                .accountPassword(account.get().getAccountPassword())
                .accountBankName(account.get().getAccountBankName())
                .accountRecentBalance(accountTransaction.getAccountBalance())
                .build();

        accountRepository.save(newAccount);
    }


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
        updateRecentBalance(accountTransaction); // 계좌 잔액 업데이트

        return accountDealNum;
    }

    // 거래 번호 만들기
    private String createAccountDealNum() {
        log.info("거래 번호 생성");
        String accountDealNum = "T"+RandomStringUtils.random(8, true, true);
        while(accountTransactionRepository.existsByAccountDealNum(accountDealNum)){
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
