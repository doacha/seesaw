package com.doacha.seesawbank.model.service;


import com.doacha.seesawbank.model.dto.SpendingResponse;
import com.doacha.seesawbank.model.entity.User;
import com.doacha.seesawbank.repository.CardTransactionRepository;
import com.doacha.seesawbank.repository.UserRepository;
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
    UserRepository userRepository;
    public List<SpendingResponse> findAllByUserId (String userId){
        Optional<User> user = userRepository.findById(userId);
        List<SpendingResponse> cardTranscationList = findAllByUserId(user.get().getUserId());
        return cardTranscationList;
    }

}
