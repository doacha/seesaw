package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.mission.*;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MissionRepository;
import com.doacha.seesaw.repository.RecordRepository;
import com.doacha.seesaw.repository.SpendingRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class MissionService {

    @Autowired
    MissionRepository missionRepository;

    @Autowired
    MemberMissionRepository memberMissionRepository;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    SpendingRepository spendingRepository;

    @Autowired
    private S3Uploader s3Uploader;

    // 미션 목록
    public List<MissionListResponse> getMissionList(Pageable pageable) {
        List<MissionListResponse> list = missionRepository.findMissionListResponseByMissionByIsPublic(pageable);
        return list;
    }

    // 미션 생성
    public Mission createMission(MultipartFile image, CreateMissionRequest mission) throws IOException {

        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // 이미지 처리
        String storedFileName = ""; // 없을 수도 있으니 빈칸
        if(!image.isEmpty()) {
            storedFileName = s3Uploader.upload(image,"mission");
        }

        Mission createdMission = Mission.builder()
                .missionId(createRandomId())
                .missionCategoryId(mission.getMissionCategoryId())
                .missionCreationTime(Timestamp.valueOf(now))
                .missionTitle(mission.getMissionTitle())
                .missionMemberCount(1)
                .missionMaxCount(mission.getMissionMaxCount())
                .missionImgUrl(storedFileName)
                .missionPurpose(mission.getMissionPurpose())
                .missionDeposit(mission.getMissionDeposit())
                .missionIsPublic(mission.isMissionIsPublic())
                .missionTargetPrice(mission.getMissionTargetPrice())
                .missionPeriod(mission.getMissionPeriod())
                .missionStatus(0)
                .missionTotalCycle(mission.getMissionTotalCycle())
                .missionCurrentCycle(0)
                .missionStartDate(Date.valueOf(mission.getMissionStartDate()))
                .missionHostEmail(mission.getMissionHostEmail())

                .build();

        return missionRepository.save(createdMission);
    }

    // 미션 아이디 랜덤 생성
    private String createRandomId() {
        log.info("미션 아이디 생성");
        String randomId = RandomStringUtils.random(10, true, true);
        while(missionRepository.existsById(randomId)){
            log.info("동일한 미션 아이디 존재 - 미션 아이디 재생성");
            randomId = RandomStringUtils.random(10, true, true);
        }
        log.info("미션 아이디 생성 성공");
        return randomId;
    }

    // 미션 검색
    public List<MissionListResponse> searchMission(Pageable pageable, SearchMissionRequest searchMissionRequest) {
        return missionRepository.searchMissions(searchMissionRequest.getKeyword(),
                searchMissionRequest.getMissionCategoryId(),
                searchMissionRequest.getMissionPeriod(),
                searchMissionRequest.getMissionCycle(), pageable);
    }

    // 미션 상세
    public Optional<Mission> getMissionDetail(String missionId) {
        log.info("미션 아이디 : {}", missionId);
        Optional<Mission> mission = missionRepository.findById(missionId);
        if (!mission.isPresent()) throw new NoContentException(missionId+"에 해당하는 미션 없음");
        return mission;
    }

    // 미션 인원수 변경
    public Mission updateMissionMemberCount(String missionId, int cnt){
        Optional<Mission> mission = missionRepository.findById(missionId);
        Mission updatedMission = Mission.builder()
                .missionId(missionId)
                .missionTitle(mission.get().getMissionTitle())
                .missionMemberCount(mission.get().getMissionMemberCount() + cnt)
                .missionMaxCount(mission.get().getMissionMaxCount())
                .missionImgUrl(mission.get().getMissionImgUrl())
                .missionPurpose(mission.get().getMissionPurpose())
                .missionDeposit(mission.get().getMissionDeposit())
                .missionIsPublic(mission.get().isMissionIsPublic())
                .missionTargetPrice(mission.get().getMissionTargetPrice())
                .missionPeriod(mission.get().getMissionPeriod())
                .missionTotalCycle(mission.get().getMissionTotalCycle())
                .missionCurrentCycle(mission.get().getMissionCurrentCycle())
                .missionStartDate(mission.get().getMissionStartDate())
                .missionCreationTime(mission.get().getMissionCreationTime())
                .missionHostEmail(mission.get().getMissionHostEmail())
                .missionCategoryId(mission.get().getMissionCategoryId())
                .build();

        return missionRepository.save(updatedMission);
    }

    // 미션의 카테고리에 해당하는 개인 지출 월 평균
    public SpendingAverageResponse getSpendingAverage(int categoryId, String memberEmail){
        YearMonth endMonth = YearMonth.from(LocalDateTime.now().minusMonths(1));
        LocalDateTime end = endMonth.atEndOfMonth().atTime(LocalTime.MAX);
        LocalDateTime start = LocalDateTime.now().minusMonths(12).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        Optional<Long> sum = spendingRepository.findSumByPeriodAndCategory(categoryId,memberEmail,start,end);
        if(sum.isPresent()){
            double average = (double)sum.get()/12.0;
        SpendingAverageResponse spendingAverageResponse = SpendingAverageResponse.builder()
                .memberEmail(memberEmail)
                .categoryId(categoryId)
                .average(average)
                .build();
        return spendingAverageResponse; }
        else{
            SpendingAverageResponse spendingAverageResponse = SpendingAverageResponse.builder()
                    .memberEmail(memberEmail)
                    .categoryId(categoryId)
                    .average(0.0)
                    .build();
            return spendingAverageResponse;
        }
    }

    // 미션 삭제
    public void deleteMission(String missionId){
        missionRepository.deleteById(missionId);
    }

//     미션에 해당하는 카테고리별 개인 금액 합계 및 총합
    public MissionStatsResponse getCategorySumAndAverageByMissionAndMember (String memberEmail, String missionId){
        MissionStatsResponse missionStatsRequestList =spendingRepository.getCategorySumAndAverageByMissionAndMember(memberEmail, missionId);
        return missionStatsRequestList;
    }
    public CompareWithMissionMemberResponse getCompareMissionMemberStats(String memberEmail, String missionId){
        Optional<Mission> mission = missionRepository.findById(missionId);
        int categoryId = mission.get().getMissionCategoryId();
        Date date = mission.get().getMissionStartDate();
        Instant instant = date.toInstant();
        LocalDateTime start = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalDateTime end = start.plusDays(mission.get().getMissionPeriod()*mission.get().getMissionTotalCycle());
        log.info("start: {}", start);
        log.info("end :{}", end);
        List<MissionMemberSumDto> missionMemberSumDtoList = spendingRepository.getMissionMemberSum(missionId, start, end);
        for(MissionMemberSumDto m : missionMemberSumDtoList){
        }
        return null;
    }
    // 미션 내 랭킹
//    public MissionRankingResponse getMissionRanking (String missionId){
//        MissionTopSpendingResponse missionTopSpendingResponse = recordRepository.getMissionTopSpender(missionId);
//        MissionFrugalSpendingResponse missionFrugalSpendingResponse = recordRepository.getMissionFrugalSpender(missionId);
//        DailyTopSpendingResponse dailyTopSpendingResponse = recordRepository.getDailyTopSpender(missionId);
//        MissionRankingResponse missionRankingResponse = MissionRankingResponse.builder()
//                .missionTopSpender(missionTopSpendingResponse.getMissionTopSpender())
//                .missionTopSpending(missionTopSpendingResponse.getMissionTopSpending())
//                .missionFrugalSpender(missionFrugalSpendingResponse.getMissionFrugalSpender())
//                .missionFrugalSpending(missionFrugalSpendingResponse.getMissionFrugalSpending())
//                .dailyTopSpender(dailyTopSpendingResponse.getDailyTopSpender())
//                .dailyTopSpending(dailyTopSpendingResponse.getDailyTopSpending())
//                .dailyTopSpendingNum(dailyTopSpendingResponse.getDailyTopSpendingNum())
//                .build();
//        return missionRankingResponse;
//    }


    // 완료 미션 최근 기록 5개
    public List<RecentMissionResponse> getRecentMissionStats(String missionId, String memberEmail){
        List<RecentMissionResponse> recentMissionResponses = recordRepository.getRecentMissionStats(missionId, memberEmail, PageRequest.of(0, 5));
        return recentMissionResponses;
    }
    public Long getMySpendingSum(String missionId, String memberEmail){
        Optional<Mission> mission = missionRepository.findById(missionId);
        int categoryId = mission.get().getMissionCategoryId();
        int period = mission.get().getMissionPeriod();
        LocalDateTime end=LocalDateTime.now();
        LocalDateTime start = end.minusDays(period-1);
        Optional<Long> mySpendingSum = spendingRepository.findSumByPeriodAndCategory(categoryId, memberEmail, start, end);
        if(mySpendingSum.isPresent()){
        return mySpendingSum.get();
        }
        else{
            throw new NoContentException();
        }
    }
    // 미션 기간만큼 과거 소비와 미션 비교
    public MissionSavingResponse getMissionSavingResponse(String missionId, String memberEmail){
        Optional<Mission> mission = missionRepository.findById(missionId);
        int categoryId = mission.get().getMissionCategoryId();
        Date end = mission.get().getMissionStartDate();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(end);
        calendar.add(Calendar.DAY_OF_MONTH, -mission.get().getMissionPeriod() * mission.get().getMissionTotalCycle());
        java.util.Date utilStartDate = calendar.getTime();
        Date start = new Date(utilStartDate.getTime());
        Long missionTotalCost = recordRepository.findMissionSum(missionId, memberEmail);
        Long pastTotalCost = spendingRepository.findPastSum(memberEmail,categoryId, start,end);
        MissionSavingResponse missionSavingResponse = MissionSavingResponse.builder()
                .missionId(missionId)
                .pastTotalCost(pastTotalCost)
                .missionTotalCost(missionTotalCost)
                .difference(missionTotalCost-pastTotalCost)
                .build();
        return missionSavingResponse;
    }
    // 미션 통계 내에 나의 순위 + 평균 소비 금액
    public MyMissionStatResponse getMyMissionStats(String missionId, String memberEmail){
        Optional<MyMissionAverageResponse> optionalResponse= recordRepository.getMyMissionAverage(missionId, memberEmail);
        List<MyMissionRankingResponse> missionRankingList = recordRepository.getMyMissionRanking(missionId);
        MyMissionRankingResponse myMissionRankingResponse = null;
        int size=0;
        for(MyMissionRankingResponse missionRankingResponse : missionRankingList){
            if(missionRankingResponse.getMemberEmail().equals(memberEmail)){
                myMissionRankingResponse = missionRankingResponse;
                break;
            }
        }
        if(optionalResponse.isPresent()){
            MyMissionStatResponse myMissionStatsResponse = MyMissionStatResponse.builder()
                    .missionId(myMissionRankingResponse.getMissionId())
                    .sum(myMissionRankingResponse.getSum())
                    .ranking(myMissionRankingResponse.getRanking())
                    .missionMemberCount
                            (myMissionRankingResponse.getMissionMemberCount())
                    .memberEmail(myMissionRankingResponse.getMemberEmail())
                    .average(optionalResponse.get().getAverage())
                    .count(optionalResponse.get().getCount())
                    .build();
            return myMissionStatsResponse;
        }
        else{
            throw new NoContentException("데이터 없음");
        }
    }
    public CompareMissionResponse getCompareMissionAverage(String missionId){
        List<CompareMissionDto> compareMissionResponse = recordRepository.getCompareMission(missionId);
        Optional<Mission> mission = missionRepository.findById(missionId);
        Double myAverageSum =0.0; // 내가 속한 미션
        for(CompareMissionDto dto : compareMissionResponse ){
            myAverageSum+= dto.getMissionAverage();
        }
        if(mission.isPresent()) {
            int categoryId = mission.get().getMissionCategoryId();
            int missionPeriod= mission.get().getMissionPeriod();
            List<EntireMissionDto> entireMissionDtos = recordRepository.getEntireMissionByCategoryId(missionId,categoryId);
            Double entireAverageSum=0.0;
            for(EntireMissionDto entireMissionDto : entireMissionDtos){
                Double entireSum =0.0;
                entireSum+=entireMissionDto.getSum()/(entireMissionDto.getMissionPeriod()*entireMissionDto.getMissionTotalCycle()*entireMissionDto.getMissionMemberCount());
                entireAverageSum+=entireSum;
            }
            double entireAverage = entireAverageSum/(double)entireMissionDtos.size();
            double missionAverage = myAverageSum/(compareMissionResponse.size()*missionPeriod);
            CompareMissionResponse realCompareMissionResponse = CompareMissionResponse.builder()
                    .missionId(missionId)
                    .missionAverage(missionAverage)
                    .entireAverage(entireAverage)
                    .difference(entireAverage-missionAverage)
                    .build();
            return realCompareMissionResponse;
        }
        else{
            throw new NoContentException(missionId+"에 해당하는 미션 없음");
        }
    }

    // 나의 미션 불러오기
    public List<MissionListResponse> getMyMissionList(MyMissionRequest myMissionRequest) {
        Pageable pageable = PageRequest.of(myMissionRequest.getPageNumber(), 6, Sort.by(Sort.Order.desc("missionCreationTime")));
        return missionRepository.findMissionListResponseByMemberEmail(myMissionRequest.getMemberEmail(), pageable);
    }
}
