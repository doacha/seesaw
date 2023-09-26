package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.mission.*;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.repository.MissionRepository;
import com.doacha.seesaw.repository.RecordRepository;
import com.doacha.seesaw.repository.SpendingRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class MissionService {

    @Autowired
    MissionRepository missionRepository;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    SpendingRepository spendingRepository;

    // 미션 목록
    public List<MissionListResponse> getMissionList(Pageable pageable) {
        List<MissionListResponse> list = missionRepository.findMissionListResponseByMissionByIsPublic(pageable);
        return list;
    }

    // 미션 생성
    public Mission createMission(CreateMissionRequest mission) {

        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Mission createdMission = Mission.builder()
                .missionId(createRandomId())
                .missionCategoryId(mission.getMissionCategoryId())
                .missionCreationTime(Timestamp.valueOf(now))
                .missionTitle(mission.getMissionTitle())
                .missionMemberCount(1)
                .missionMaxCount(mission.getMissionMaxCount())
                .missionImgUrl(mission.getMissionImgUrl())
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
        if (!mission.isPresent()) throw new NoContentException();
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


    // 미션 삭제
    public void deleteMission(String missionId){
        missionRepository.deleteById(missionId);
    }

//     미션에 해당하는 카테고리별 개인 금액 합계 및 총합
    public MissionStatsResponse getCategorySumAndAverageByMissionAndMember (String memberEmail, String missionId){
        MissionStatsResponse missionStatsRequestList =spendingRepository.getCategorySumAndAverageByMissionAndMember(memberEmail, missionId);
        return missionStatsRequestList;
    }

    public MissionRankingResponse getMissionRanking(String missionId){
        Pageable pageable = PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "missionTopSpending"));
        Page<MissionTopSpendingResponse> missionTopSpenderResult =  recordRepository.getMissionTopSpender(missionId,pageable);
        pageable = PageRequest.of(0, 1, Sort.by(Sort.Direction.ASC, "missionFrugalSpending"));
        Page<MissionFrugalSpendingResponse> missionFrugalSpenderResult = recordRepository.getMissionFrugalSpender(missionId,pageable);
        pageable = PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "dailyTopSpending"));
        Page<DailyTopSpendingResponse> dailyTopSpenderResult = recordRepository.getDailyTopSpender(missionId,pageable);
            MissionRankingResponse missionRankingResponse = MissionRankingResponse.builder()
                    .missionTopSpender(missionTopSpenderResult.getContent().get(0).getMissionTopSpender())
                    .missionTopSpending(missionTopSpenderResult.getContent().get(0).getMissionTopSpending())
                    .missionFrugalSpender(missionFrugalSpenderResult.getContent().get(0).getMissionFrugalSpender())
                    .missionFrugalSpending(missionFrugalSpenderResult.getContent().get(0).getMissionFrugalSpending())
                    .dailyTopSpender(dailyTopSpenderResult.getContent().get(0).getDailyTopSpender())
                    .dailyTopSpending(dailyTopSpenderResult.getContent().get(0).getDailyTopSpending())
                    .dailyTopSpendingNum(dailyTopSpenderResult.getContent().get(0).getDailyTopSpendingNum())
                    .build();
            return missionRankingResponse;
    }
    // 미션 통계 내에 나의 순위
//    public MyMissionRankingResponse getMyMissionRanking(String missionId, String memberEmail){
//        List<MyMissionRankingResponse> missionRankingList = recordRepository.getMyMissionRanking(missionId);
//        MyMissionRankingResponse myMissionRankingResponse = null;
//        for(MyMissionRankingResponse missionRankingResponse : missionRankingList){
//            if(missionRankingResponse.getMemberEmail().equals(memberEmail)){
//               myMissionRankingResponse = missionRankingResponse;
//                break;
//            }
//
//        }
//        return myMissionRankingResponse;
//    }

    // 미션 통계 내에 나의 순위 + 평균 소비 금액
    public MyMissionStatResponse getMyMissionStats(String missionId, String memberEmail){
        Optional<MyMissionAverageResponse> optionalResponse= recordRepository.getMyMissionAverage(missionId, memberEmail);
        List<MyMissionRankingResponse> missionRankingList = recordRepository.getMyMissionRanking(missionId);
        MyMissionRankingResponse myMissionRankingResponse = null;
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
                    .memberEmail(myMissionRankingResponse.getMemberEmail())
                    .average(optionalResponse.get().getAverage())
                    .count(optionalResponse.get().getCount())
                    .build();
            return myMissionStatsResponse;
        }
        else{
            throw new NoContentException();
        }
    }
//    public MyMissionAverageResponse getMyMissionAverage(String missionId, String memberEmail){
//        Optional<MyMissionAverageResponse> optionalResponse= recordRepository.getMyMissionAverage(missionId, memberEmail);
//        if(optionalResponse.isPresent()){
//            MyMissionAverageResponse myMissionAverageResponse = MyMissionAverageResponse.builder()
//                    .missionId(optionalResponse.get().getMissionId())
//                    .average(optionalResponse.get().getAverage())
//                    .memberEmail(optionalResponse.get().getMemberEmail())
//                    .count(optionalResponse.get().getCount())
//                    .build();
//            return myMissionAverageResponse;
//        }
//        else{
//            throw new NoContentException();
//        }
//
//    }

//    public CompareMissionResponse getCompareMissionAverage(String missionId){
//        CompareMissionDto compareMissionResponse = recordRepository.getMissionAverage(missionId);
//        Optional<Mission> mission = missionRepository.findById(missionId);
//        if(mission.isPresent()) {
//            int categoryId = mission.get().getMissionCategoryId();
//            int missionPeriod= mission.get().getMissionPeriod();
//            Double entireAverage= spendingRepository.FindEntireAverageByCategoryIdAndDay(categoryId);
//            Long count = recordRepository.countByCategoryIdAndDay(categoryId);
//            CompareMissionResponse realCompareMissionResponse = CompareMissionResponse.builder()
//                    .missionId(compareMissionResponse.getMissionId())
//                    .missionAverage(compareMissionResponse.getMissionAverage())
//                    .entireAverage(entireAverage)
//                    .difference(compareMissionResponse.getMissionAverage()-entireAverage)
//                    .build();
//            return realCompareMissionResponse;
//        }
//        else{
//            throw new NoContentException();
//        }
//    }



}
