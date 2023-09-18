package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.*;
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
        int category = 0;
        switch(spendingdto.getSpendingCategory()){
            case "일반음식점","일반한식점","일반양식점","일반중식점","일반일식점"-> category = 1;
            case "카페","제과점"-> category=2;
            case "주점"-> category = 3;
            case "마트","슈퍼마켓","시장","문구점"-> category=4;
            case "백화점","쇼핑몰","아울렛"-> category = 5;
            case "의류가게","신발가게","모자가게"-> category = 6;
            case "화장품가게","미용실","드럭스토어","네일아트","피부샵"-> category = 7;
            case "버스","택시","지하철","기차","비행기","배"->category=8;
            case "주유소","주차","톨게이트"->category=9;
            case "인터넷","텔레콤","TV","인테리어","수도세","전기세","가스"-> category = 10;
            case "병원","약국","헬스장","필라테스/요가","운동"-> category = 11;
            case "은행","증권사","저축은행","카드사","캐피탈","가상화폐 거래소"-> category = 12;
            case "영화관","극장","매표소","문화/여가 기타"-> category = 13;
            case "콘도","펜션","호텔","모텔","숙박공유업"-> category = 14;
            case "외국어 학원","컴퓨터 학원","요리 학원","자격증 학원","입시 학원","기타 학원"-> category = 15;
            case "애완 동물"-> category = 16;
            case "자녀/육아"-> category=17;
            case "경조/선물"-> category = 18;
        }
        Spending spending = Spending.builder()
                .spendingTitle(spendingdto.getSpendingTitle())
                .spendingCost(spendingdto.getSpendingCost())
                .spendingDate(spendingdto.getSpendingDate())
                .spendingMemo(spendingdto.getSpendingMemo())
                .spendingCategoryId(category)
                .member(member.get())
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

        // 변경할 지출 새로 저장
        Spending update = Spending.builder()
                .spendingId(spending.get().getSpendingId())
                .spendingTitle(spendingUpdateRequest.getSpendingTitle())
                .spendingCost(spendingUpdateRequest.getSpendingCost())
                .spendingDate(spendingUpdateRequest.getSpendingDate())
                .spendingMemo(spendingUpdateRequest.getSpendingMemo())
                .spendingCategoryId(spendingUpdateRequest.getSpendingCategoryId())
                .member(member.get())
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
