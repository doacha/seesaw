package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.SpendingDto;
import com.doacha.seesaw.model.entity.Spending;
import com.doacha.seesaw.repository.SpendingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SpendingServiceImpl implements SpendingService{
    private final SpendingRepository spendingRepository;

    // 등록 save
    // 수정 update
    // 삭제 delete
    @Override
    public void save(SpendingDto spendingDto){

    }

    @Override
    public void update(SpendingDto spendingDto){

    }

    @Override
    public void delete(SpendingDto spendingDto){

    }

    @Override
    public Page<Spending> findAllByUserEmail(String userEmail) {
        return null;
    }


    @Override
    public Spending read(int SpendingId) {
        return null;
    }
}
