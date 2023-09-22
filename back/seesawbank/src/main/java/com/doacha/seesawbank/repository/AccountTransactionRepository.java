package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.dto.account.AccountListResponse;
import com.doacha.seesawbank.model.dto.account.AccountTransactionListResponse;
import com.doacha.seesawbank.model.entity.Account;
import com.doacha.seesawbank.model.entity.AccountTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AccountTransactionRepository extends JpaRepository<AccountTransaction, String> {

    boolean existsByAccountDealNum(String accountDealNum);
    Optional<AccountTransaction> findTopByAccountOrderByAccountTransactionTimeDesc(Account account);

    @Query("SELECT new com.doacha.seesawbank.model.dto.account.AccountTransactionListResponse(" +
            "a.accountTransactionName, a.accountTransactionTime, a.accountApprovalAmount) " +
            "FROM AccountTransaction a " +
            "WHERE a.account = :account "+
            "order by a.accountTransactionTime desc ")
    List<AccountTransactionListResponse> findAccountTransactionsByAccountTimeDesc(Account account);

//    @Query("SELECT new com.doacha.seesawbank.model.dto.account.AccountListResponse(" +
//            "a.accountName, a.accountNum, a.accountName, (select at.accountBalance from at where at.account.accountNum = a.accountNum order by at.accountTransactionTime desc limit 1)) " +
//            "FROM AccountTransaction at " +
//            "JOIN at.account a " +
//            "WHERE a.member.memberId = :memberId ")
//    List<AccountListResponse> findAccountListResponseByMemberId(String memberId);

//    @Query(value = "SELECT new com.doacha.seesawbank.model.dto.account.AccountListResponse(" +
//            "act.account.accountName, act.account.accountNum, act.account.accountName, act.accountBalance) " +
//            "FROM AccountTransaction act " +
//            "WHERE act.account.member.memberId = :memberId " +
//            "group by act.account.accountNum" +
//            "order by act.accountTransactionTime desc " +
//            "limit 1",
//            nativeQuery = true)
//    List<AccountListResponse> findAccountListResponseByMemberId(String memberId);
}
