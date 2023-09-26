package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.mission.*;
import com.doacha.seesaw.model.dto.record.*;
import com.doacha.seesaw.model.entity.MemberMission;
import com.doacha.seesaw.model.entity.Record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {

//    @Query("SELECT new com.doacha.seesaw.model.dto.record.RecordListResponse(r.recordId, mm.member.memberNickname, mm.member.memberImgUrl, r.recordTotalCost, r.recordStatus) " +
//            "FROM Record r " +
//            "JOIN r.memberMission mm " +
//            "WHERE mm.mission.missionId = :missionId AND r.recordNumber = :recordNumber " +
//            "ORDER BY r.recordTotalCost ASC")
//    List<RecordListResponse> getRecordListResponseByMissionId(@Param("missionId") String missionId, @Param("recordNumber") int recordNumber);

    @Query("SELECT new com.doacha.seesaw.model.dto.record.RecordListResponse(r.recordId, mm.member.memberNickname, mm.member.memberImgUrl, r.recordTotalCost, r.recordStatus, (SELECT COUNT(subR) FROM Record subR WHERE subR.memberMission = mm AND subR.recordStatus = 1)) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId AND r.recordNumber = :recordNumber " +
            "ORDER BY r.recordTotalCost ASC")
    List<RecordListResponse> getRecordListResponseByMissionId(@Param("missionId") String missionId, @Param("recordNumber") int recordNumber);

    @Query("SELECT new com.doacha.seesaw.model.dto.record.RecordResponse(r.recordId, r.recordContent, r.recordWriteTime, r.recordTotalCost, r.recordNumber, r.recordStatus, mm.member.memberEmail, mm.member.memberNickname, mm.member.memberImgUrl) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE r.recordId = :recordId")
    RecordResponse findRecordResponseById(@Param("recordId") Long recordId);

    @Query("SELECT new com.doacha.seesaw.model.dto.record.MemberHistory(r.recordId, r.recordNumber ,mm.member.memberNickname, mm.member.memberImgUrl, r.recordTotalCost, r.recordStatus) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId AND r.recordNumber < :currentCycle " +
            "ORDER BY r.recordTotalCost ASC")
    List<MemberHistory> getMemberHistoryByMissionId(@Param("missionId") String missionId, @Param("currentCycle") int currentCycle);


    @Query("SELECT COUNT(r) FROM Record r WHERE r.memberMission.mission.missionId = :missionId AND r.memberMission.member.memberEmail = :memberEmail AND r.recordStatus = 2")
    int countFail(@Param("missionId") String missionId, @Param("memberEmail") String memberEmail);


    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MissionTopSpendingResponse(mm.member.memberNickname AS missionTopSpender, SUM(r.recordTotalCost) AS missionTopSpending) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId " +
            "GROUP BY mm.member.memberNickname " +
            "ORDER BY SUM(r.recordTotalCost) DESC")
    Page<MissionTopSpendingResponse> getMissionTopSpender(@Param("missionId") String missionId, Pageable pageable);

    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MissionFrugalSpendingResponse(mm.member.memberNickname AS missionFrugalSpender, SUM(r.recordTotalCost) AS missionFrugalSpending) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId " +
            "GROUP BY mm.member.memberNickname " +
            "ORDER BY SUM(r.recordTotalCost) ASC")
    Page<MissionFrugalSpendingResponse> getMissionFrugalSpender(@Param("missionId") String missionId, Pageable pageable);

    @Query("SELECT new com.doacha.seesaw.model.dto.mission.DailyTopSpendingResponse (mm.member.memberNickname AS dailyTopSpender, MAX(r.recordTotalCost) AS dailyTopSpending,r.recordNumber AS dailyTopSpendingNum) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId " +
            "GROUP BY mm.member.memberNickname " +
            "ORDER BY r.recordTotalCost DESC ")
    Page<DailyTopSpendingResponse> getDailyTopSpender(@Param("missionId") String missionId,Pageable pageable);

    @Query("SELECT COUNT(r) FROM Record r WHERE r.memberMission.mission.missionId = :missionId AND r.memberMission.member.memberEmail = :memberEmail AND r.recordStatus = 2")
    int countFail(@Param("missionId") String missionId, @Param("memberEmail") String memberEmail);

    // 미션 랭킹 가져오기
    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.MyMissionRankingResponse(" +
            "m.missionId, " +
            "SUM(r.recordTotalCost) AS sum, " +
            "ROW_NUMBER() OVER (ORDER BY SUM(r.recordTotalCost) ASC) AS ranking, " +
            "mm.member.memberEmail, " +
            "m.missionMemberCount) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "JOIN mm.mission m " +
            "WHERE m.missionId = :missionId " +
            "GROUP BY m.missionId, mm.member.memberEmail " +
            "ORDER BY SUM(r.recordTotalCost) ASC")
    List<MyMissionRankingResponse> getMyMissionRanking(@Param("missionId") String missionId);
    @Query("SELECT m.missionId, AVG(r.recordTotalCost), mm.member.memberEmail " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "JOIN mm.mission m " +
            "WHERE m.missionId = :missionId AND mm.member.memberEmail = :memberEmail")
    Object[] getMyMissionAverage(@Param("missionId") String missionId, @Param("memberEmail") String memberEmail);


    @Query("SELECT COUNT(r) FROM Record r WHERE r.memberMission.member.memberEmail = :memberEmail AND r.memberMission.mission.missionId = :missionId")
    Long countMissionMember(@Param("missionId") String missionId, @Param("memberEmail") String memberEmail);

    @Query("SELECT r.recordTotalCost FROM Record r WHERE r.memberMission.mission.missionId = :missionId AND r.memberMission.member.memberEmail = :memberEmail ORDER BY r.recordNumber ASC ")
    List<Integer> findRecordTotalCostByMissionIdAndMemberEmail(@Param("missionId") String missionId, @Param("memberEmail") String memberEmail);

    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.CompareMissionDto(" +
            "mm.mission.missionId AS missionId, " +
            "AVG(r.recordTotalCost) AS missionAverage) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId")
    CompareMissionDto getCompareMission(@Param("missionId") String missionId);


    @Query("SELECT COUNT(s) FROM Spending s WHERE s.spendingCategoryId = :categoryId GROUP BY DAY(s.spendingDate) ")
    Long countByCategoryIdAndDay(@Param("categoryId") int categoryId);

    @Query("SELECT r.recordNumber, r.recordStartDate, r.recordEndDate, r.recordStatus, s.spendingTitle, s.spendingCost " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "JOIN mm.mission m " +
            "JOIN r.spendingList s " +
            "WHERE m.missionId = :missionId " +
            "AND mm.member.memberEmail = :memberEmail ")
    List<Object[]> findRecordAndSpendingByMissionIdAndMemberEmail(@Param("missionId") String missionId, @Param("memberEmail") String memberEmail);


    List<Record> findRecordByMemberMissionOrderByRecordStartDateDesc(@Param("memberMission")MemberMission memberMission);
}
