package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.entity.CardTransaction;
import com.doacha.seesawbank.model.dto.SpendingResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardTransactionRepository extends JpaRepository<CardTransaction, String> {

    // 유저 아이디로 카드 거래내역 가져오기
    @Query("SELECT NEW com.doacha.seesawbank.model.dto.SpendingResponse(c.card.member.memberId, c.cardStoreName, c.cardApprovalAmount, c.cardCompany, c.cardStoreCategory, c.cardTransactionTime) FROM CardTransaction c WHERE c.card.member.memberId = :memberId ORDER BY c.cardTransactionTime DESC")
    List<SpendingResponse> findAllByMemberId(@Param("memberId") String memberId);
}
