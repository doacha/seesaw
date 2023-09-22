package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String>, JpaSpecificationExecutor<Account>  {
//    boolean existsAccountNum(String memberEmail);
    Optional<Account> findByAccountId(int accountId);

    @Modifying
    @Query("UPDATE Account a set a.accountNum = :accountNum WHERE a.accountId = :accountId and a.member.memberId = :memberId")
    void updateAccountNumByAccountIdAndMemberId(@Param("accountId") int accountId, @Param("memberId") String memberId, @Param("accountNum") String accountNum);
}
