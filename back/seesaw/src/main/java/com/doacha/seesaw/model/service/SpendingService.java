package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.MonthSpendingResponse;
import com.doacha.seesaw.model.dto.SpendingDto;
import com.doacha.seesaw.model.dto.SpendingUpdateDto;
import com.doacha.seesaw.model.entity.Spending;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface SpendingService {
    // Spending 저장
    void save(Spending spending);
    // Spending 수정
    void update(SpendingUpdateDto spendingUpdateDto);
    // Spending 삭제
    void delete(Long spendingId);
    // 로그인되어 있는 유저의 이메일에 일치하는 Spending 목록 가져오기
    Page<MonthSpendingResponse> findAllByUserEmailAndYearAndMonth(Pageable pageable, String userEmail, String spendingYear, String spendingMonth);
    // Spending 상세보기
    Optional<Spending> read(Long spendingId);
}
