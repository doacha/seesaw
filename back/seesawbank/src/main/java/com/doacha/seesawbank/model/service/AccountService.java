package com.doacha.seesawbank.model.service;

import com.doacha.seesawbank.exception.BadRequestException;
import com.doacha.seesawbank.model.dto.account.*;
import com.doacha.seesawbank.model.entity.Account;
import com.doacha.seesawbank.model.entity.AccountTransaction;
import com.doacha.seesawbank.model.entity.Member;
import com.doacha.seesawbank.repository.AccountRepository;
import com.doacha.seesawbank.repository.AccountTransactionRepository;
import com.doacha.seesawbank.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final AccountTransactionRepository accountTransactionRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public AccountResponse createAccount(CreateAccountRequest createAccountRequest) {
        boolean isExist = memberRepository
                .existsByMemberId(createAccountRequest.getMemberId());
        if (!isExist) throw new BadRequestException("존재하지 않는 아이디입니다.");

        Optional<Member> member = memberRepository.findById(createAccountRequest.getMemberId());
        String encodedPassword = passwordEncoder.encode(createAccountRequest.getAccountPassword());
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Account newAccount = Account.builder()
                .accountNum(createAccountNum())
                .member(member.get())
                .accountName(createAccountRequest.getAccountName())
                .accountType(1)
                .accountInterestRate(2.0f)
                .accountStatus(0)
                .accountCreationTime(Timestamp.valueOf(now))
                .accountPassword(encodedPassword)
                .accountBankName(0) // 개설은 시소뱅크만 할 수 있기 때문
                .accountRecentBalance(0) // 처음엔 0원이므로
                .build();

        accountRepository.save(newAccount);

        AccountResponse accountResponse = new AccountResponse(
                newAccount.getAccountNum(),
                newAccount.getAccountName(),
                newAccount.getMember().getMemberId()
        );
        return accountResponse;
    }

    // 계좌 목록 가져오기
    @Transactional
    public List<AccountListResponse> getAccountList(String memberId) {
        List<AccountListResponse> list = accountRepository.findAccountListResponseByMemberId(memberId);
        return list;
    }

    // 계좌 내역 가져오기
    @Transactional
    public List<AccountTransactionListResponse> getAccountDetail(String accountNum) {
        Optional<Account> account = accountRepository.findAccountByAccountNum(accountNum);
        List<AccountTransactionListResponse> list = accountTransactionRepository.findAccountTransactionsByAccountTimeDesc(account.get());
// TODO: 알ㄴ아ㅣ;ㅓ라ㅣㅓㄹ란어ㅣ; 일주일 자르자
        //        for(AccountTransactionListResponse atlr : list){
//            if(!dateDiff(atlr.getAccountTransactionTime(), -7){
//                list.remove(atlr);
//            }
////            if(atlr.getAccountTransactionTime().before(dateAdd(LocalDateTime.now(), -7))){
////                list.remove(atlr);
////            }
//        }
        return list;
    }

    // 날짜 더하는 함수
    public boolean dateDiff(Timestamp date, int plus){
        if(date == null) return false;
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        DateFormat df = new SimpleDateFormat("yyyy-mm-dd");
        cal.add(Calendar.DATE, plus);
        java.sql.Timestamp t = java.sql.Timestamp.valueOf(df.format(cal.getTime()));
        int compare = date.compareTo(cal.getTime());
        if(compare > 0) {
            return true;
        }else {
            return false;
        }
    }

    // 계좌 해지
    @Transactional
    public boolean deleteAccount(DeleteAccountRequest deleteAccountRequest) {
        Optional<Account> account = accountRepository.findAccountByAccountNum(deleteAccountRequest.getAccountNum());
        String encodedPassword = passwordEncoder.encode(deleteAccountRequest.getAccountPassword());

        boolean matches = passwordEncoder.matches(
                deleteAccountRequest.getAccountPassword(),
                account.get().getAccountPassword());
        if (!matches) throw new BadRequestException("비밀번호를 확인하세요.");

        Account newAccount = Account.builder()
                .accountNum(account.get().getAccountNum())
                .member(account.get().getMember())
                .accountName(account.get().getAccountName())
                .accountType(account.get().getAccountType())
                .accountInterestRate(account.get().getAccountInterestRate())
                .accountStatus(3)
                .accountCreationTime(account.get().getAccountCreationTime())
                .accountPassword(account.get().getAccountPassword())
                .accountBankName(account.get().getAccountBankName())
                .accountRecentBalance(account.get().getAccountRecentBalance())
                .build();

        accountRepository.save(newAccount);

        return true;
    }

    // 계좌 번호 만들기
    private String createAccountNum() {
        String accountNum = "457899-01-"+ RandomStringUtils.random(6, false, true);
        while(accountRepository.existsById(accountNum)){
            accountNum = "457899-01-"+RandomStringUtils.random(6, false, true);
        }
        return accountNum;
    }

}
