package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.DailySpendingSumResponse;
import com.doacha.seesaw.model.dto.MonthSpendingResponse;
import com.doacha.seesaw.model.dto.SpendingDto;
import com.doacha.seesaw.model.dto.SpendingUpdateRequest;
import com.doacha.seesaw.model.entity.Spending;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface SpendingService {
    // Spending 저장
    void save(SpendingDto spendingdto);
    // Spending 수정
    void update(SpendingUpdateRequest spendingUpdateRequest);
    // Spending 삭제
    void delete(Long spendingId);
    // 로그인되어 있는 유저의 이메일에 일치하는 Spending 목록 가져오기
    List<MonthSpendingResponse> findAllByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth,String condition);
    // Spending 상세보기
    Optional<Spending> read(Long spendingId);
    List<DailySpendingSumResponse> findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth);
}
