package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.SpendingDto;
import com.doacha.seesaw.model.entity.Spending;
import org.springframework.data.domain.Page;

public interface SpendingService {
    // Spending 저장
    void save(SpendingDto spendingDto);
    // Spending 수정
    void update(SpendingDto spendingDto);
    // Spending 삭제
    void delete(SpendingDto spendingDto);
    // 로그인되어 있는 유저의 이메일에 일치하는 Spending 목록 가져오기
    Page<Spending> findAllByUserEmail(String userEmail);
    // Spending 상세보기
    Spending read(int SpendingId);
}
