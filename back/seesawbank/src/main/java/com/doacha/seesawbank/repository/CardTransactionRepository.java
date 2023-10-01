package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.dto.cardTransaction.GetCardTransactionResponse;
import com.doacha.seesawbank.model.entity.CardTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface CardTransactionRepository extends JpaRepository<CardTransaction, String> {

    // 유저 아이디로 카드 거래내역 가져오기
//    @Query("SELECT NEW com.doacha.seesawbank.model.dto.cardTransaction.SpendingResponse(c.card.member.memberId, c.cardApprovalNum, c.cardStoreName, c.cardApprovalAmount, c.cardCompany, c.cardStoreCategory, c.cardTransactionTime) FROM CardTransaction c WHERE c.card.member.memberId = :memberId ORDER BY c.cardTransactionTime DESC")
//    List<SpendingResponse> findAllByMemberId(@Param("memberId") String memberId);


    @Query("SELECT NEW com.doacha.seesawbank.model.dto.cardTransaction.GetCardTransactionResponse" +
            "(c.card.member.memberId, c.cardApprovalNum, c.cardStoreName, c.cardApprovalAmount, c.cardCompany, c.cardStoreCategory, c.cardTransactionTime) " +
            "FROM CardTransaction c WHERE c.card.member.memberId = :memberId " +
            "AND (:startDateTime IS NULL OR c.cardTransactionTime > :startDateTime) " +
            "AND (:endDateTime IS NULL OR c.cardTransactionTime <= :endDateTime) " +
            "ORDER BY c.cardTransactionTime DESC")
    List<GetCardTransactionResponse> findCardTransactionResponseByCardTransactionRequest(@Param("memberId") String memberId, @Param("startDateTime") Timestamp startDateTime, @Param("endDateTime") Timestamp endDateTime);

}

