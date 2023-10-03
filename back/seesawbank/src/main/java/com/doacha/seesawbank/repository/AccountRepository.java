package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.dto.account.AccountListResponse;
import com.doacha.seesawbank.model.entity.Account;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String>, JpaSpecificationExecutor<Account>  {

    Optional<Account> findAccountByAccountNum(@Param("accountNum") String accountNum);

    @Query("SELECT new com.doacha.seesawbank.model.dto.account.AccountListResponse(" +
            "a.accountName, a.accountType, a.accountNum, a.accountBankName, a.accountRecentBalance) " +
            "FROM Account a " +
            "WHERE a.member.memberId = :memberId "
            )
    List<AccountListResponse> findAccountListResponseByMemberId(String memberId);

//    @Modifying
//    @Query("UPDATE Account a set a.accountNum = :accountNum WHERE a.accountId = :accountId and a.member.memberId = :memberId")
//    void updateAccountNumByAccountIdAndMemberId(@Param("accountId") int accountId, @Param("memberId") String memberId, @Param("accountNum") String accountNum);
}
