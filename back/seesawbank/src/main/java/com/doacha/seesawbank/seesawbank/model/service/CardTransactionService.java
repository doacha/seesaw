package com.doacha.seesawbank.seesawbank.model.service;


import com.doacha.seesawbank.seesawbank.model.dto.SpendingResponse;
import com.doacha.seesawbank.seesawbank.model.entity.Member;
import com.doacha.seesawbank.seesawbank.repository.CardTransactionRepository;
import com.doacha.seesawbank.seesawbank.repository.MemberRepository;
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
    public List<SpendingResponse> findAllByMemberId (String memberId){
        Optional<Member> member = memberRepository.findById(memberId);
        List<SpendingResponse> cardTranscationList = findAllByMemberId(member.get().getMemberId());
        return cardTranscationList;
    }

}
