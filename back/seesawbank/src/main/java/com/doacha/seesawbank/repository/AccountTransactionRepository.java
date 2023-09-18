package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.entity.Account;
import com.doacha.seesawbank.model.entity.AccountTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AccountTransactionRepository extends JpaRepository<AccountTransaction, String> {

//    @Query("SELECT a.accountBalance FROM AccountTransaction a " +
//            "WHERE a.account.accountNum = :accountNum " +
//            "ORDER BY a.accountTransactionTime DESC " +
//            "LIMIT 1")
    Optional<AccountTransaction> findTopByAccountOrderByAccountTransactionTimeDesc(Account account);
}
