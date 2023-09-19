package com.doacha.seesawbank.model.service;

import com.doacha.seesawbank.exception.BadRequestException;
import com.doacha.seesawbank.model.dto.account.AccountResponse;
import com.doacha.seesawbank.model.dto.account.CreateAccountRequest;
import com.doacha.seesawbank.model.entity.Account;
import com.doacha.seesawbank.model.entity.Member;
import com.doacha.seesawbank.repository.AccountRepository;
import com.doacha.seesawbank.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
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
                .accountIsInactivate(false)
                .accountCreationTime(Timestamp.valueOf(now))
                .accountPassword(encodedPassword)
                .build();

        accountRepository.save(newAccount);

        AccountResponse accountResponse = new AccountResponse(
                newAccount.getAccountNum(),
                newAccount.getAccountName(),
                newAccount.getMember().getMemberId()
        );
        return accountResponse;
    }

    // 거래 번호 만들기
    private String createAccountNum() {
        String accountNum = "457899-01-"+ RandomStringUtils.random(6, false, true);
        while(accountRepository.existsById(accountNum)){
            accountNum = "457899-01-"+RandomStringUtils.random(6, false, true);
        }
        return accountNum;
    }

}
