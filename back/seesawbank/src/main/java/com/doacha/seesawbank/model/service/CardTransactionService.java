package com.doacha.seesawbank.model.service;


import com.doacha.seesawbank.model.dto.SpendingResponse;
import com.doacha.seesawbank.model.entity.Member;
import com.doacha.seesawbank.repository.CardTransactionRepository;
import com.doacha.seesawbank.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j

public class CardTransactionService {
    @Autowired
    CardTransactionRepository cardTransactionRepository;
    @Autowired
    MemberRepository memberRepository;
    public List<SpendingResponse> findAllByUserId (String userId){
        Optional<Member> user = memberRepository.findById(userId);
        List<SpendingResponse> cardTranscationList = findAllByUserId(user.get().getMemberId());
        return cardTranscationList;
    }

}
