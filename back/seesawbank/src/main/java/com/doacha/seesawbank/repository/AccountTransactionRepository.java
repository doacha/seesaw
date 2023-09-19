package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.entity.Account;
import com.doacha.seesawbank.model.entity.AccountTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountTransactionRepository extends JpaRepository<AccountTransaction, String> {

    boolean existsByAccountDealNum(String accountDealNum);
    Optional<AccountTransaction> findTopByAccountOrderByAccountTransactionTimeDesc(Account account);
}
