package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.ForbiddenException;
import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.spending.*;
import com.doacha.seesaw.model.entity.*;
import com.doacha.seesaw.model.entity.Record;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MemberRepository;
import com.doacha.seesaw.repository.RecordRepository;
import com.doacha.seesaw.repository.SpendingRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.YearMonth;
import java.util.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Service
@Slf4j
public class SpendingService {

    @Autowired
    SpendingRepository spendingRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberMissionRepository memberMissionRepository;
    @Autowired
    RecordRepository recordRepository;

    @Value("${seesawBank_api}")
    private String seesawBank_api;

    // 등록 save
    public void save(SpendingDto spendingDto) {
        log.info("등록한 내역과 카테고리 & 기간 일치하는 미션에 참여중인지 확인");
        Record record = checkRecord(spendingDto.getMemberEmail(), spendingDto.getSpendingCategoryId(), spendingDto.getSpendingDate());

        Optional<Member> member = memberRepository.findById(spendingDto.getMemberEmail());
        Spending spending = Spending.builder()
                .spendingTitle(spendingDto.getSpendingTitle())
                .spendingCost(spendingDto.getSpendingCost())
                .spendingDate(spendingDto.getSpendingDate())
                .spendingMemo(spendingDto.getSpendingMemo())
                .spendingCategoryId(spendingDto.getSpendingCategoryId())
                .spendingType(1)
                .member(member.get())
                .record(record)
                .build();

        spendingRepository.save(spending);

        if (record == null) return;

        log.info("가계부와 미션 연동");
        linkSpendingToRecord(record, spending);
    }


    // 시소뱅크에서 카드내역 받아오기 (매일 밤 12시마다 실행)
    @Scheduled(cron = "0 0 24 * * *")
    public void getCardTransactionDto() {
        // 카드 내역 불러올 목록 가져오기 (미션 참여자의 missionId, memberEmail, memberBankId, lastSpendingTime)
        // 현재 진행중인 미션에 참여하고 있는 멤버에 대해서 카드 목록 불러옴
        List<GetCardTransactionDto> list = memberMissionRepository.findGetCardTransactionDto();
        log.info("카드 내역 불러올 목록 - {}", list);

        // 어제의 마지막 시각 구하기
        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalTime lastTime = LocalTime.of(23, 59, 59, 999999999); // 나노초까지 설정
        LocalDateTime yesterdayLastDateTime = LocalDateTime.of(yesterday, lastTime);

        for (GetCardTransactionDto dto : list) {

            GetCardTransactionRequest request = GetCardTransactionRequest.builder()
                    .memberId(dto.getMemberBankId())
                    .startDateTime(dto.getLastSpendingTime())
                    .endDateTime(Timestamp.valueOf(yesterdayLastDateTime))
                    .build();

            getCardTransactionFromSeeSawBank(request, dto.getMemberEmail());
        }
    }


    // 해당 월의 지출 목록 불러오기
    public List<MonthSpendingResponse> findAllByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth, String condition) {
        List<MonthSpendingResponse> monthSpendingResponses = spendingRepository.findAllByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail, spendingYear, spendingMonth, condition);
        return monthSpendingResponses;
    }


    // 시소 뱅크에서 카드내역 받아오기
    public void getCardTransactionFromSeeSawBank(GetCardTransactionRequest request, String memberEmail) {
        log.info("시소 뱅크에 카드 내역 요청");
        Mono<GetCardTransactionResponse[]> mono = WebClient.create()
                .post()
                .uri(seesawBank_api + "/card-transaction/list")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(GetCardTransactionResponse[].class);

        mono.subscribe(cardTransactionResponses -> {
            for (GetCardTransactionResponse response : cardTransactionResponses) {

                log.info("카테고리 & 기간 일치하는 미션에 참여중인지 확인");
                int categoryId = categoryMapping(response.getCardStoreCategory());
                Record record = checkRecord(memberEmail, categoryId, response.getCardTransactionTime());

                if (record == null) continue;

                Spending spending = Spending.builder()
                        .spendingTitle(response.getCardStoreName())
                        .spendingCost(response.getCardApprovalAmount())
                        .spendingDate(response.getCardTransactionTime())
                        .spendingMemo(null)
                        .spendingCategoryId(categoryMapping(response.getCardStoreCategory()))
                        .spendingType(0)
                        .member(memberRepository.findById(memberEmail).get())
                        .record(record)
                        .build();

                log.info("가계부와 미션 연동");
                linkSpendingToRecord(record, spending);

                log.info("카드 내역 가계부에 저장");
                spendingRepository.save(spending);
            }
        });
    }

    // 소비 내역의 카테고리에 해당하는 미션에 참여중인지 확인
    private Record checkRecord(String memberEmail, int categoryId, Timestamp spendingDate) {
        Record record = recordRepository.findRecordByMemberEmailAndCategoryId(memberEmail, categoryId);

        if (record == null) {
            log.info("카테고리에 해당하는 미션에 참여하지 않음");
            return null;
        }

        Date date = new Date(spendingDate.getTime()); // 소비 날짜
        if (date.before(record.getRecordStartDate()) || date.after(record.getRecordEndDate())) {
            log.info("소비 날짜와 참여중인 미션의 기간 일치하지 않음");
            return null;
        }

        log.info("카테고리 & 기간 일치하는 미션에 참여중");

        return record;
    }

    // 가계부와 미션 연동
    public void linkSpendingToRecord(Record record, Spending spending) {
        Mission mission = record.getMemberMission().getMission();
        MemberMission memberMission = record.getMemberMission();

        log.info("해당 미션의 레코드 업데이트");
        // recordTotalCost에 spendingDto.getSpegingCost 더해주기
        // 업데이트된 recordTotalCost가 missionTargetPrice 넘었으면 record_status 2(실패)로 변경
        Record updatedRecord = Record.builder().recordId(record.getRecordId()).recordContent(record.getRecordContent()).recordWriteTime(record.getRecordWriteTime()).recordStartDate(record.getRecordStartDate()).recordEndDate(record.getRecordEndDate()).recordTotalCost(record.getRecordTotalCost() + spending.getSpendingCost()).recordNumber(record.getRecordNumber()).recordStatus(record.getRecordTotalCost() + spending.getSpendingCost() > mission.getMissionTargetPrice() ? 2 : record.getRecordStatus()).memberMission(record.getMemberMission()).spendingList(record.getSpendingList()).build();

        recordRepository.save(updatedRecord);

        if (record.getRecordStatus() == 2) {
            log.info("이미 실패한 레코드");
            return;
        }

        int myFailCnt = recordRepository.countFail(record.getMemberMission().getMission().getMissionId(), spending.getMember().getMemberEmail()); // 나의 실패 횟수
        int penalty = 0;
        int cnt = mission.getMissionTotalCycle() - (int) (mission.getMissionTotalCycle() * 0.2);

        if (myFailCnt > mission.getMissionTotalCycle() * 0.2) {
            if (myFailCnt == mission.getMissionTotalCycle()) {
                penalty = mission.getMissionDeposit() - mission.getMissionDeposit() / cnt * (cnt - 1);
            } else {
                penalty = mission.getMissionDeposit() / cnt;
            }

            Mission updatedMission = Mission.builder().missionId(mission.getMissionId()).missionTitle(mission.getMissionTitle()).missionMemberCount(mission.getMissionMemberCount()).missionMaxCount(mission.getMissionMaxCount()).missionImgUrl(mission.getMissionImgUrl()).missionPurpose(mission.getMissionPurpose()).missionDeposit(mission.getMissionDeposit()).missionIsPublic(mission.isMissionIsPublic()).missionTargetPrice(mission.getMissionTargetPrice()).missionPenaltyPrice(mission.getMissionPenaltyPrice() + penalty) // 벌금 더해주기
                    .missionPeriod(mission.getMissionPeriod()).missionTotalCycle(mission.getMissionTotalCycle()).missionCurrentCycle(mission.getMissionCurrentCycle()).missionStatus(mission.getMissionStatus()).missionStartDate(mission.getMissionStartDate()).missionCreationTime(mission.getMissionCreationTime()).missionHostEmail(mission.getMissionHostEmail()).missionCategoryId(mission.getMissionCategoryId()).build();

            MemberMission updatedMemberMission = MemberMission.builder().mission(updatedMission).member(memberMission.getMember()).memberMissionRefund(memberMission.getMemberMissionRefund() - penalty) // 반환금액 차감
                    .memberMissionStatus(3) // 미션 실패
                    .memberMissionSavingMoney(memberMission.getMemberMissionSavingMoney()).memberMissionIsSaving(memberMission.getMemberMissionIsSaving()).build();
            log.info("memberMissionStatus, memberMissionRefund, missionPenalty 업데이트");
            memberMissionRepository.save(updatedMemberMission);
        }
    }

    // 카테고리 지정
    public int categoryMapping(String category) {
        int categoryId = 0;
        switch (category) {
            case "일반음식점", "일반한식점", "일반양식점", "일반중식점", "일반일식점", "패스트푸드점":
                categoryId = 1;
                break;
            case "카페", "제과점":
                categoryId = 2;
                break;
            case "주점":
                categoryId = 3;
                break;
            case "마트", "슈퍼마켓", "시장", "문구점":
                categoryId = 4;
                break;
            case "백화점", "쇼핑몰", "아울렛":
                categoryId = 5;
                break;
            case "의류가게", "신발가게", "모자가게":
                categoryId = 6;
                break;
            case "화장품가게", "미용실", "드럭스토어", "네일아트", "피부샵":
                categoryId = 7;
                break;
            case "버스", "택시", "지하철", "기차", "비행기", "배":
                categoryId = 8;
                break;
            case "주유소", "주차", "톨게이트":
                categoryId = 9;
                break;
            case "인터넷", "텔레콤", "TV", "인테리어", "수도세", "전기세", "가스":
                categoryId = 10;
                break;
            case "병원", "약국", "헬스장", "필라테스/요가", "운동":
                categoryId = 11;
                break;
            case "은행", "증권사", "저축은행", "카드사", "캐피탈", "가상화폐 거래소":
                categoryId = 12;
                break;
            case "영화관", "극장", "매표소", "문화/여가 기타":
                categoryId = 13;
                break;
            case "콘도", "펜션", "호텔", "모텔", "숙박공유업":
                categoryId = 14;
                break;
            case "외국어 학원", "컴퓨터 학원", "요리 학원", "자격증 학원", "입시 학원", "기타 학원":
                categoryId = 15;
                break;
            case "애완 동물":
                categoryId = 16;
                break;
            case "자녀/육아":
                categoryId = 17;
                break;
            case "경조/선물":
                categoryId = 18;
                break;
            case "편의점":
                categoryId = 19;
        }
        return categoryId;
    }

    // 지출 수정
    public void update(SpendingUpdateRequest spendingUpdateRequest) {
        // spendingId로 지출 찾기
        Optional<Spending> spending = spendingRepository.findById(spendingUpdateRequest.getSpendingId());
        if (!spending.isPresent()) throw new NoContentException(spendingUpdateRequest.getSpendingId()+"에 해당하는 지출없음");

        // 카테고리에 해당하는 미션에 참여중인지 확인 => 참여중이면 수정 불가능
        Record record = checkRecord(spendingUpdateRequest.getMemberEmail(), spendingUpdateRequest.getSpendingCategoryId(), spendingUpdateRequest.getSpendingDate());
        if (record != null) throw new ForbiddenException("카테고리가 일치하는 미션에 참여중입니다.");

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
                .spendingType(spending.get().getSpendingType())
                .record(spending.get().getRecord())
                .member(member.get()).build();
        spendingRepository.save(update);

    }

    // 지출 삭제
    public void delete(Long spendingId) {
        // 해당하는 spending 내역 가져오기
        Optional<Spending> spending = spendingRepository.findById(spendingId);
        if (!spending.isPresent()) throw new NoContentException(spendingId+"에 해당하는 지출 없음");

        // 카테고리에 해당하는 미션에 참여중인지 확인 => 참여중이면 삭제 불가능
        Record record = checkRecord(spending.get().getMember().getMemberEmail(), spending.get().getSpendingCategoryId(), spending.get().getSpendingDate());
        if (record != null) throw new ForbiddenException("카테고리가 일치하는 미션에 참여중입니다.");

        spendingRepository.deleteById(spendingId);
    }


    // 지출 상세
    public SpendingDetailResponse detailResponse(Long spendingId) {
        Optional<Spending> spending = spendingRepository.findById(spendingId);
        String memo = "";
        if (spending.isPresent()) {
            SpendingDetailResponse spendingDetailResponse = SpendingDetailResponse.builder().spendingId(spending.get().getSpendingId()).spendingTitle(spending.get().getSpendingTitle()).spendingCost(spending.get().getSpendingCost()).spendingDate(spending.get().getSpendingDate()).spendingMemo(spending.get().getSpendingMemo()).spendingCategoryId(spending.get().getSpendingCategoryId()).build();
            return spendingDetailResponse;
        } else {
            throw new NoContentException(spendingId+"에 해당하는 지출 없음");
        }
    }

    public List<DailySpendingSumResponse> findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth) {
        List<DailySpendingSumResponse> dailySpendingSumResponses = spendingRepository.findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail, spendingYear, spendingMonth);
        List<DailySpendingSumResponse> entireDailySpendingSumResponses = new ArrayList<>();
        int max = 0;
        if (spendingMonth == 2 && (spendingYear % 4 == 0 && (spendingYear % 100 != 0 || spendingYear % 400 == 0))) {
            max = 29;
        } else if (spendingMonth == 2) {
            max = 28;
        } else if (spendingMonth == 1 || spendingMonth == 3 || spendingMonth == 5 || spendingMonth == 7 || spendingMonth == 8 || spendingMonth == 10 || spendingMonth == 12) {
            max = 31;
        } else {
            max = 30;
        }
        for (int i = 1; i <= max; i++) {
            boolean visit = false;
            for (DailySpendingSumResponse d : dailySpendingSumResponses) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTimeInMillis(d.getSpendingDate().getTime());
                int year = calendar.get(Calendar.YEAR);
                int month = calendar.get(Calendar.MONTH) + 1;
                int day = calendar.get(Calendar.DAY_OF_MONTH);
                if (year == spendingYear && month == spendingMonth && day == i) {
                    entireDailySpendingSumResponses.add(d);
                    visit = true;
                    break;
                }
            }
            if (!visit) {
                Calendar calendar = Calendar.getInstance();
                calendar.set(spendingYear, spendingMonth - 1, i);
                Date newDate = calendar.getTime();
                Timestamp expectedDate = new Timestamp(newDate.getTime());
                DailySpendingSumResponse emptySpendingSumResponse = DailySpendingSumResponse.builder().spendingCostSum(0).spendingDate(expectedDate).memberEmail(memberEmail).build();
                entireDailySpendingSumResponses.add(emptySpendingSumResponse);
            }
        }
        Collections.sort(entireDailySpendingSumResponses, Comparator.comparing(DailySpendingSumResponse::getSpendingDate));
        return entireDailySpendingSumResponses;
    }

//     입력 받은 월 1년간 합계
//    public List<MonthSpendingSumResponse> getMonthSumList(String memberEmail, int spendingYear, int spendingMonth) {
//        LocalDateTime start = LocalDateTime.of(spendingYear - 1, spendingMonth + 1, 1, 0, 0);
//        LocalDateTime end = LocalDateTime.of(spendingYear, spendingMonth, 1, 0, 0).plusMonths(1).minusSeconds(1);
//        List<MonthSpendingSumResponse> monthSpendingSumResponseList = spendingRepository.getMonthSumList(memberEmail, start, end);
//        List<MonthSpendingSumResponse> entireMonthSpendingSumResponses = new ArrayList<>();
//        int a = spendingMonth;
//        int count = 0;
//        while (count != 12) {
//            boolean visit = false;
//            for (MonthSpendingSumResponse m : monthSpendingSumResponseList) {
//                if (m.getSpendingCostSum() != 0) {
//                    entireMonthSpendingSumResponses.add(m);
//                    visit = true;
//                    count++;
//                    spendingMonth++;
//                    break;
//                }
//            }
//            if (!visit) {
//                Calendar calendar = Calendar.getInstance();
//                calendar.set(spendingYear, spendingMonth, 1);
//                Date newDate = calendar.getTime();
//                Timestamp date = new Timestamp(newDate.getTime());
//                MonthSpendingSumResponse monthSpendingSumResponse = MonthSpendingSumResponse.builder()
//                        .spendingCostSum(0L)
//                        .spendingYear(date.getYear())
//                        .spendingMonth(date.getMonth())
//                        .memberEmail(memberEmail)
//                        .build();
//                entireMonthSpendingSumResponses.add(monthSpendingSumResponse);
//                count++;
//                spendingMonth--;
//            }
//        }
//        return entireMonthSpendingSumResponses;
//    }

    public List<MonthSpendingSumResponse> getMonthSumList(String memberEmail, int spendingYear, int spendingMonth) {
        YearMonth yearMonth = YearMonth.of(spendingYear, spendingMonth);
        int lastDayOfMonth = yearMonth.lengthOfMonth();
        LocalDateTime start = LocalDateTime.of(spendingYear-1, spendingMonth+1, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(spendingYear, spendingMonth, lastDayOfMonth, 23, 59, 59);
        List<MonthSpendingSumResponse> monthSpendingSumResponseList = spendingRepository.getMonthSumList(memberEmail, start, end);
        List<MonthSpendingSumResponse> entireMonthSpendingSumResponses = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            boolean visit = false;
            for(MonthSpendingSumResponse m : monthSpendingSumResponseList){
                if (m.getSpendingYear() == spendingYear && m.getSpendingMonth() == spendingMonth && m.getSpendingCostSum() != 0) {
                    entireMonthSpendingSumResponses.add(m);
                    visit = true;
                    break;
                }
            }
            if (!visit) {
                MonthSpendingSumResponse monthSpendingSumResponse = MonthSpendingSumResponse.builder()
                        .spendingCostSum(0L)
                        .spendingYear(spendingYear)
                        .spendingMonth(spendingMonth)
                        .memberEmail(memberEmail)
                        .build();
                entireMonthSpendingSumResponses.add(monthSpendingSumResponse);
            }
            spendingMonth--;
            if (spendingMonth == 0) {
                spendingMonth = 12;
                spendingYear--;
            }
        }
        entireMonthSpendingSumResponses.sort(Comparator
                .comparing(MonthSpendingSumResponse::getSpendingYear)
                .thenComparing(MonthSpendingSumResponse::getSpendingMonth));
        return entireMonthSpendingSumResponses;
    }
    // 지출 월별 합계
    public MonthSpendingSumResponse findAllMonthSumByMemberEmailAndSpendingYear(String memberEmail, int spendingYear, int spendingMonth) {
        MonthSpendingSumResponse monthSpendingSumResponses = spendingRepository.findMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail, spendingYear, spendingMonth);
        return monthSpendingSumResponses;
    }

    // 전 월과 금액 비교
    public MonthCompareResponse findMonthDifferenceByMemberEmailAndSpendingYearAndSpendingMonth(String memberEmail, int spendingYear, int spendingMonth) {
        MonthSpendingSumResponse currentSum = spendingRepository.findMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail, spendingYear, spendingMonth);
        Optional<MonthSpendingSumResponse> pastSum = null;

        if (spendingMonth == 1) {
            pastSum = spendingRepository.findPastMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail, spendingYear, 12);
        } else {
            pastSum = spendingRepository.findPastMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(memberEmail, spendingYear, spendingMonth - 1);
        }
        if (pastSum.isPresent()) {
            MonthCompareResponse monthCompareResponse = MonthCompareResponse.builder().memberEmail(memberEmail).difference(currentSum.getSpendingCostSum() - pastSum.get().getSpendingCostSum()).build();
            return monthCompareResponse;
        } else {
            MonthCompareResponse monthCompareResponse = MonthCompareResponse.builder().memberEmail(memberEmail).difference(currentSum.getSpendingCostSum()).build();
            return monthCompareResponse;
        }

    }


    // 월 카테고리별 금액 합계
    public List<MonthCategoryResponse> findMonthSumByCategory(String memberEmail, int spendingYear, int spendingMonth) {
        List<MonthCategoryResponse> monthCategoryResponses = spendingRepository.findMonthSumByCategory(memberEmail, spendingYear, spendingMonth);
        return monthCategoryResponses;
    }

    // 가계부에 카드내역 받아오기
    public void refreshSpending(String memberEmail) {
        GetCardTransactionDto dto = memberRepository.findGetCardTransactionDtoByMemberEmail(memberEmail);

        if(dto.getMemberBankId() == null) throw new NoContentException("연결된 시소 뱅크 계정이 없습니다");

        GetCardTransactionRequest request = GetCardTransactionRequest.builder().memberId(dto.getMemberBankId()).startDateTime(dto.getLastSpendingTime()).endDateTime(null).build();

        getCardTransactionFromSeeSawBank(request, dto.getMemberEmail());
    }
}
