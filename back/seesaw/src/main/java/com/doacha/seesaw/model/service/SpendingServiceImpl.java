package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.*;
import com.doacha.seesaw.model.entity.Category;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.Spending;
import com.doacha.seesaw.repository.CategoryRepository;
import com.doacha.seesaw.repository.MemberRepository;
import com.doacha.seesaw.repository.RecordRepository;
import com.doacha.seesaw.repository.SpendingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SpendingServiceImpl implements SpendingService{
    private final SpendingRepository spendingRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final RecordRepository recordRepository;
    // 등록 save
    @Override
    public void save(SpendingDto spendingdto){
        Optional<Category> category = categoryRepository.findById(spendingdto.getCategoryId());
        Optional<Member> member = memberRepository.findById(spendingdto.getMemberEmail());
        Spending spending = Spending.builder()
                .spendingTitle(spendingdto.getSpendingTitle())
                .spendingCost(spendingdto.getSpendingCost())
                .spendingDate(spendingdto.getSpendingDate())
                .spendingMemo(spendingdto.getSpendingMemo())
                .category(category.get())
                .member(member.get())
                .record(null)
                .build();
        spendingRepository.save(spending);
    }

    // 지출 수정
    @Override
    public void update(SpendingUpdateRequest spendingUpdateRequest){
        // spendingId로 지출 찾기
        Optional<Spending> spending = spendingRepository.findById(spendingUpdateRequest.getSpendingId());
        if (!spending.isPresent()) throw new NoContentException();
        else{
        // 입력받은 카테고리 번호로 해당하는 카테고리 찾기
        Optional<Category> category = categoryRepository.findById(spendingUpdateRequest.getCategoryId());
        // 이메일로 멤버 찾기
        Optional<Member> member = memberRepository.findById(spendingUpdateRequest.getMemberEmail());
        // 기록 찾기
//        Optional<Record> record = recordRepository.findById(spendingUpdateRequest.getRecordId());
        // 변경할 지출 새로 저장
        Spending update = Spending.builder()
                .spendingId(spending.get().getSpendingId())
                .spendingTitle(spendingUpdateRequest.getSpendingTitle())
                .spendingCost(spendingUpdateRequest.getSpendingCost())
                .spendingDate(spendingUpdateRequest.getSpendingDate())
                .spendingMemo(spendingUpdateRequest.getSpendingMemo())
                .category(category.get())
                .member(member.get())
                .record(null)
                .build();
        spendingRepository.save(update);}
    }
    // 지출 삭제
    @Override
    public void delete(Long spendingId){
        spendingRepository.deleteById(spendingId);
    }


    // 해당 월의 지출 목록 불러오기
    @Override
    public List<MonthSpendingResponse> findAllByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth, String condition) {
        List<MonthSpendingResponse> monthSpendingResponses = spendingRepository.findAllByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail,spendingYear,spendingMonth,condition);
        return monthSpendingResponses;
    }
    // 지출 상세
    @Override
    public Optional<Spending> read(Long spendingId) {
        Optional<Spending> spending = spendingRepository.findById(spendingId);
        return spending;
    }

    // 지출 일별 합계
    @Override
    public List<DailySpendingSumResponse> findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth) {
        List<DailySpendingSumResponse>dailySpendingSumResponses= spendingRepository.findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail,spendingYear,spendingMonth);
        return dailySpendingSumResponses;
    }
    // 지출 월별 합계
    @Override
    public List<MonthSpendingSumResponse> findMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth){
        List<MonthSpendingSumResponse> monthSpendingSumResponses = spendingRepository.findMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail,spendingYear,spendingMonth);
        return monthSpendingSumResponses;
    }

    @Override
    public List<MonthCategoryResponse> findMonthSumByCategory(String memberEmail, int spendingYear, int spendingMonth) {
        List<MonthCategoryResponse> monthCategoryResponses= spendingRepository.findMonthSumByCategory(memberEmail,spendingYear,spendingMonth);
        return monthCategoryResponses;
    }

}
