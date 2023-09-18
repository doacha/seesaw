package com.doacha.seesawbank.seesawbank.model.service;

import com.doacha.seesawbank.seesawbank.model.dto.account.AccountResponse;
import com.doacha.seesawbank.seesawbank.model.dto.account.CreateAccountRequest;
import com.doacha.seesawbank.seesawbank.model.entity.Account;
import com.doacha.seesawbank.seesawbank.model.entity.Member;
import com.doacha.seesawbank.seesawbank.repository.AccountRepository;
import com.doacha.seesawbank.seesawbank.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
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
        Optional<Member> member = memberRepository.findById(createAccountRequest.getMemberId());
        String encodedPassword = passwordEncoder.encode(createAccountRequest.getAccountPassword());
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Account newAccount = Account.builder()
                .member(member.get())
                .accountName(createAccountRequest.getAccountName())
                .accountType(1)
                .accountInterestRate(2.0f)
                .accountIsInactivate(false)
                .accountCreationTime(Timestamp.valueOf(now))
                .accountPassword(encodedPassword)
                .build();

        accountRepository.save(newAccount);

        String realAccountNum = "457899-01-" + newAccount.getAccountNum();
        AccountResponse accountResponse = new AccountResponse(
                realAccountNum,
                newAccount.getAccountName(),
                newAccount.getMember().getMemberId()
        );
        return accountResponse;
    }

}
