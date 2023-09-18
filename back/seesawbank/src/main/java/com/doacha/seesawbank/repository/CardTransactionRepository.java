package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.dto.SpendingResponse;
import com.doacha.seesawbank.model.entity.CardTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardTransactionRepository extends JpaRepository<CardTransaction, String> {

    // 유저 아이디로 카드 거래내역 가져오기
    @Query("SELECT NEW com.doacha.seesawbank.model.dto.SpendingResponse(c.account.user.userId, c.cardStoreName, c.cardApprovalAmount, c.cardCompany, c.cardStoreCategory, c.cardTransactionTime) FROM CardTransaction c WHERE c.account.user.userId = :userId ORDER BY c.cardTransactionTime DESC")
    List<SpendingResponse> findAllByUserId(@Param("userId") String userId);

}
