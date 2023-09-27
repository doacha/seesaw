package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.spending.*;
import com.doacha.seesaw.model.entity.Spending;

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
    List<MonthSpendingResponse> findAllByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth, String condition);

    // 지출 상세
    SpendingDetailResponse detailResponse(Long spendingId);

    List<DailySpendingSumResponse> findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth);

    MonthSpendingSumResponse findAllMonthSumByMemberEmailAndSpendingYear(String memberEmail, int spendingYear,int spendingMonth);
    List<MonthCategoryResponse> findMonthSumByCategory(String memberEmail, int spendingYear, int spendingMonth);

    MonthCompareResponse findMonthDifferenceByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth);

}
