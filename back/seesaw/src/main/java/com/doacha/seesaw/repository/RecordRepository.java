package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.mission.*;
import com.doacha.seesaw.model.dto.record.*;
import com.doacha.seesaw.model.entity.MemberMission;
import com.doacha.seesaw.model.entity.Record;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {

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

    @Query("SELECT rm.member.memberNickname, SUM(r.recordTotalCost) " +
            "FROM Record r " +
            "INNER JOIN r.memberMission rm " +
            "WHERE rm.mission.missionId = :missionId " +
            "GROUP BY rm " +
            "ORDER BY SUM(r.recordTotalCost) ASC")
    List<Object[]> findMinTotalCostByMissionId(@Param("missionId") String missionId);

    @Query("SELECT rm.member.memberNickname, SUM(r.recordTotalCost) " +
            "FROM Record r " +
            "INNER JOIN r.memberMission rm " +
            "WHERE rm.mission.missionId = :missionId " +
            "GROUP BY rm " +
            "ORDER BY SUM(r.recordTotalCost) DESC " +
            "LIMIT 1")
    List<Object[]> findMaxTotalCostByMissionId(@Param("missionId") String missionId);

    @Query("SELECT rm.member.memberNickname, r.recordTotalCost, r.recordNumber " +
            "FROM Record r " +
            "INNER JOIN r.memberMission rm " +
            "WHERE rm.mission.missionId = :missionId " +
            "ORDER BY r.recordTotalCost DESC " +
            "LIMIT 1")
    List<Object[]> findMaxTotalCostRecordByMissionId(@Param("missionId") String missionId);

    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.RecentMissionResponse(" +
        "m.missionId, " +
        "mm.member.memberEmail, " +
        "r.recordTotalCost AS recordTotalCost, " +
        "r.recordNumber) " +
        "FROM Record r " +
        "JOIN r.memberMission mm " +
        "JOIN mm.mission m " +
        "WHERE m.missionId = :missionId AND mm.member.memberEmail = :memberEmail " +
        "GROUP BY r.recordNumber " +
        "ORDER BY r.recordNumber DESC ")
    List<RecentMissionResponse> getRecentMissionStats(@Param("missionId") String missionId , @Param("memberEmail")String memberEmail, Pageable pageable);

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

    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.MyMissionAverageResponse(" +
            "m.missionId, " +
            "AVG(r.recordTotalCost) as average, " +
            "mm.member.memberEmail as memberEmail, " +
            "COUNT(r.recordId) as count) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "JOIN mm.mission m " +
            "WHERE m.missionId = :missionId " +
            "AND mm.member.memberEmail = :memberEmail " +
            "GROUP BY m.missionId, mm.member.memberEmail")
   Optional<MyMissionAverageResponse> getMyMissionAverage(@Param("missionId") String missionId, @Param("memberEmail") String memberEmail);

    @Query("SELECT r.recordTotalCost FROM Record r WHERE r.memberMission.mission.missionId = :missionId AND r.memberMission.member.memberEmail = :memberEmail ORDER BY r.recordNumber ASC ")
    List<Integer> findRecordTotalCostByMissionIdAndMemberEmail(@Param("missionId") String missionId, @Param("memberEmail") String memberEmail);

    @Query("SELECT SUM(r.recordTotalCost) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId AND mm.member.memberEmail = :memberEmail " )
    Long findMissionSum(@Param("missionId")String missionId, @Param("memberEmail")String memberEmail);
    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.CompareMissionDto(" +
            "mm.mission.missionId AS missionId, " +
            "AVG(r.recordTotalCost) AS missionAverage) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId " +
            "GROUP BY r.recordStartDate ")
    List<CompareMissionDto> getCompareMission(@Param("missionId") String missionId);

    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.EntireMissionDto(" +
            "mm.mission.missionId AS missionId, " +
            "SUM(r.recordTotalCost) AS sum, " +
            "mm.mission.missionPeriod AS missionPeriod, " +
            "mm.mission.missionTotalCycle AS missionCurrentCycle , " +
            "mm.mission.missionMemberCount AS missionMemberCount ) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId != :missionId AND mm.mission.missionCategoryId = :categoryId " +
            "GROUP BY mm.mission.missionId ")
    List<EntireMissionDto> getEntireMissionByCategoryId(@Param("missionId")String missionId,@Param("categoryId") int categoryId);


    @Query("SELECT AVG(s.spendingCost) FROM Spending s WHERE s.spendingCategoryId = :categoryId GROUP BY DAY(s.spendingDate)")
    Double averageByCategoryId(@Param("categoryId") int categoryId);

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

    @Query("SELECT r " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.member.memberEmail = :memberEmail " +
            "AND mm.mission.missionStatus = 1 " +
            "AND mm.mission.missionCategoryId = :categoryId " +
            "AND mm.mission.missionCurrentCycle = r.recordNumber ")
    Record findRecordByMemberEmailAndCategoryId(@Param("memberEmail") String memberEmail, @Param("categoryId") int categoryId);
}
