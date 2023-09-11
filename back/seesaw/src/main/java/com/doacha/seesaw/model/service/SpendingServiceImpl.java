package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.MonthSpendingResponse;
import com.doacha.seesaw.model.dto.SpendingDto;
import com.doacha.seesaw.model.dto.SpendingUpdateRequest;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.Spending;
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
    private final MemberRepository memberRepository;
    private final RecordRepository recordRepository;
    // 등록 save
    @Override
    public void save(SpendingDto spendingdto){
        Optional<Member> member = memberRepository.findById(spendingdto.getMemberEmail());
        Spending spending = Spending.builder()
                .spendingTitle(spendingdto.getSpendingTitle())
                .spendingCost(spendingdto.getSpendingCost())
                .spendingDate(spendingdto.getSpendingDate())
                .spendingMemo(spendingdto.getSpendingMemo())
                .spendingCategoryId(spendingdto.getSpendingCategoryId())
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
                .spendingCategoryId(spendingUpdateRequest.getCategoryId())
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


    @Override
    public List<MonthSpendingResponse> findAllByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth) {
        List<MonthSpendingResponse> monthSpendingResponses = spendingRepository.findAllByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail,spendingYear,spendingMonth);
        return monthSpendingResponses;
    }

    @Override
    public Optional<Spending> read(Long spendingId) {
        Optional<Spending> spending = spendingRepository.findById(spendingId);
        return spending;
    }
}
