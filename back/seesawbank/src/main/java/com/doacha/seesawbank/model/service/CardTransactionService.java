package com.doacha.seesawbank.model.service;


import com.doacha.seesawbank.model.dto.cardTransaction.GetCardTransactionRequest;
import com.doacha.seesawbank.model.dto.cardTransaction.GetCardTransactionResponse;
import com.doacha.seesawbank.repository.CardTransactionRepository;
import com.doacha.seesawbank.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@Slf4j
public class CardTransactionService {

    @Autowired
    CardTransactionRepository cardTransactionRepository;

//    public List<SpendingResponse> findAllByMemberId (String memberId){
//        Optional<Member> member = memberRepository.findById(memberId);
//        List<SpendingResponse> cardTranscationList = findAllByMemberId(member.get().getMemberId());
//        return cardTranscationList;
//    }

    public List<GetCardTransactionResponse> getCardTransactionList(GetCardTransactionRequest getCardTransactionRequest) {
        String memberId = getCardTransactionRequest.getMemberId();
        Timestamp startDateTime = getCardTransactionRequest.getStartDateTime();
        Timestamp endDateTime = getCardTransactionRequest.getEndDateTime();

        return cardTransactionRepository.findCardTransactionResponseByCardTransactionRequest(memberId, startDateTime, endDateTime);
    }
}
