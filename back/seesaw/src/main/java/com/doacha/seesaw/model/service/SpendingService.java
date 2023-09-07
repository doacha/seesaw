package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.MonthSpendingResponse;
import com.doacha.seesaw.model.dto.SpendingUpdateRequest;
import com.doacha.seesaw.model.entity.Spending;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface SpendingService {
    // Spending 저장
    void save(Spending spending);
    // Spending 수정
    void update(SpendingUpdateRequest spendingUpdateRequest);
    // Spending 삭제
    void delete(Long spendingId);
    // 로그인되어 있는 유저의 이메일에 일치하는 Spending 목록 가져오기
    Page<MonthSpendingResponse> findAllByMemberMemberEmailAndSpendingDateYearAndSpendingDateMonth(Pageable pageable, String memberEmail, int spendingYear, int spendingMonth);
    // Spending 상세보기
    Optional<Spending> read(Long spendingId);
}
