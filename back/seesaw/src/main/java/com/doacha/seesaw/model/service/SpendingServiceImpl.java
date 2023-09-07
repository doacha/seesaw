package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.MonthSpendingResponse;
import com.doacha.seesaw.model.dto.SpendingUpdateRequest;
import com.doacha.seesaw.model.entity.Category;
import com.doacha.seesaw.model.entity.Spending;
import com.doacha.seesaw.repository.CategoryRepository;
import com.doacha.seesaw.repository.SpendingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpendingServiceImpl implements SpendingService{
    private final SpendingRepository spendingRepository;
    private final CategoryRepository categoryRepository;

    // 등록 save
    @Override
    public void save(Spending spending){
        spendingRepository.save(spending);
    }

    // 지출 수정
    @Override
    public void update(SpendingUpdateRequest spendingUpdateRequest){
        // spendingId로 지출 찾기
        Optional<Spending> spending = spendingRepository.findById(spendingUpdateRequest.getSpendingId());
        // s에 찾은 지출 저장
        Spending s = spending.get();
        // 입력받은 카테고리 번호로 해당하는 카테고리 찾기
        Optional<Category> category = categoryRepository.findById(spendingUpdateRequest.getCategoryId());
        // 변경할 지출 새로 저장
        Spending update = Spending.builder()
                .spendingTitle(spendingUpdateRequest.getSpendingTitle())
                .spendingCost(spendingUpdateRequest.getSpendingCost())
                .spendingDate(Timestamp.valueOf(spendingUpdateRequest.getSpendingDate()))
                .spendingMemo(spendingUpdateRequest.getSpendingMemo())
                .category(category.get())
                .build();
        spendingRepository.save(update);
    }
    // 지출 삭제
    @Override
    public void delete(Long spendingId){
        spendingRepository.deleteById(spendingId);
    }


    @Override
    public Page<MonthSpendingResponse> findAllByMemberMemberEmailAndSpendingDateYearAndSpendingDateMonth(Pageable pageable, String memberEmail, int spendingYear, int spendingMonth) {
        Page<MonthSpendingResponse> monthSpendingResponses = spendingRepository.findAllByMemberMemberEmailAndSpendingDateYearAndSpendingDateMonth(pageable,memberEmail,spendingYear,spendingMonth);
        return monthSpendingResponses;
    }

    @Override
    public Optional<Spending> read(Long spendingId) {
        Optional<Spending> spending = spendingRepository.findById(spendingId);
        return spending;
    }
}
