package com.doacha.seesaw.repository;
import com.doacha.seesaw.model.dto.mission.MissionStatsResponse;
import com.doacha.seesaw.model.dto.mission.MissionMemberSumDto;
import com.doacha.seesaw.model.dto.spending.RecordSpendingResponse;
import com.doacha.seesaw.model.dto.spending.*;
import com.doacha.seesaw.model.entity.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface SpendingRepository extends JpaRepository<Spending, Long> {
    @Query("SELECT new com.doacha.seesaw.model.dto.spending.MonthSpendingResponse(s.spendingId, s.spendingTitle,s.spendingCost,s.spendingDate,s.spendingCategoryId,s.member.memberEmail)FROM Spending s WHERE s.member.memberEmail = :memberEmail AND YEAR(s.spendingDate) = :SpendingYear AND MONTH(s.spendingDate) = :SpendingMonth "+
            "ORDER BY CASE WHEN :condition ='spendingDate' THEN s.spendingDate END DESC, "+
            "CASE WHEN :condition ='spendingCost' THEN s.spendingCost END DESC")
    List<MonthSpendingResponse> findAllByMemberEmailAndSpendingYearAndSpendingMonth(@Param("memberEmail") String memberEmail, @Param("SpendingYear") int SpendingYear, @Param("SpendingMonth") int SpendingMonth,@Param("condition") String condition);

//    @Query("SELECT AVG(s.spendingCost) FROM Spending s WHERE s.member.memberEmail= :memberEmail AND s.spendingCategoryId = :categoryId ")
//    List<Long> spendingAverageByCategoryId;
    // 미션 기간만큼 과거 해당 카테고리 소비 합
    @Query("SELECT SUM(s.spendingCost) FROM Spending s WHERE s.member.memberEmail= :memberEmail AND s.spendingCategoryId= :categoryId AND s.spendingDate BETWEEN :start AND :end " )
    Long findPastSum(@Param("memberEmail") String memberEmail, @Param("categoryId") int categoryId, @Param("start") Date start, @Param("end")Date end);
    // 일별 지출 합계
    @Query("SELECT new com.doacha.seesaw.model.dto.spending.DailySpendingSumResponse(SUM(s.spendingCost) AS spendingCostSum, s.spendingDate, s.member.memberEmail) FROM Spending s WHERE s.member.memberEmail = :memberEmail AND YEAR(s.spendingDate) = :spendingYear AND MONTH(s.spendingDate) = :spendingMonth GROUP BY DAY(s.spendingDate), s.member.memberEmail")
    List<DailySpendingSumResponse> findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(@Param("memberEmail") String memberEmail, @Param("spendingYear") int spendingYear, @Param("spendingMonth") int spendingMonth);

    // 월간 지출 합계
    // @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MonthSpendingSumResponse(SUM(s.spendingCost) AS spendingCostSum, MONTH(s.spendingDate) AS spendingMonth,s.member.memberEmail)FROM Spending s WHERE s.member.memberEmail= :memberEmail AND YEAR(s.spendingDate)=:spendingYear GROUP BY MONTH(s.spendingDate),s.member.memberEmail")
    // List<MonthSpendingSumResponse> findAllMonthSumByMemberEmailAndSpendingYear(@Param("memberEmail")String memberEmail, @Param("spendingYear") int spendingYear);

    // 해당 월지출 합계
    @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MonthSpendingSumResponse(SUM(s.spendingCost) AS spendingCostSum, YEAR(s.spendingDate), MONTH(s.spendingDate) AS spendingMonth,s.member.memberEmail)FROM Spending s WHERE s.member.memberEmail= :memberEmail AND YEAR(s.spendingDate)=:spendingYear AND MONTH(s.spendingDate)=:spendingMonth GROUP BY MONTH(s.spendingDate),s.member.memberEmail")
    MonthSpendingSumResponse findMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(@Param("memberEmail")String memberEmail, @Param("spendingYear") int spendingYear, @Param("spendingMonth")int spendingMonth);
    // 전 달이 존재하지 않을 경우
    @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MonthSpendingSumResponse(SUM(s.spendingCost) AS spendingCostSum, YEAR(s.spendingDate), MONTH(s.spendingDate) AS spendingMonth,s.member.memberEmail)FROM Spending s WHERE s.member.memberEmail= :memberEmail AND YEAR(s.spendingDate)=:spendingYear AND MONTH(s.spendingDate)=:spendingMonth GROUP BY MONTH(s.spendingDate),s.member.memberEmail")
    Optional<MonthSpendingSumResponse> findPastMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(@Param("memberEmail")String memberEmail, @Param("spendingYear") int spendingYear, @Param("spendingMonth")int spendingMonth);


   @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MonthSpendingSumResponse(SUM(s.spendingCost) AS spendingCostSum, YEAR(s.spendingDate), MONTH(s.spendingDate) AS spendingMonth, s.member.memberEmail) FROM Spending s WHERE s.member.memberEmail=:memberEmail AND s.spendingDate BETWEEN :start AND :end GROUP BY MONTH(s.spendingDate)")
    List<MonthSpendingSumResponse> getMonthSumList(@Param("memberEmail") String memberEmail, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT SUM(s.spendingCost) FROM Spending s WHERE s.spendingCategoryId= :categoryId AND s.member.memberEmail=:memberEmail AND s.spendingDate BETWEEN :start AND :end ")
    Optional<Long> findSumByPeriodAndCategory(@Param("categoryId")int categoryId, @Param("memberEmail") String memberEmail, @Param("start")LocalDateTime start, @Param("end")LocalDateTime end);
    //@Query("SELECT SUM(s.spendingCost) FROM Spending s WHERE s.spendingCategoryId = :categoryId AND s.member.memberEmail = :memberEmail AND s.spendingDate <= :end")
    //Long findSumByCategoryAndEnd(@Param("categoryId") int categoryId, @Param("memberEmail") String memberEmail, @Param("end") LocalDateTime end);
    //    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.CompareMissionDto(" +
//            "mm.mission.missionId AS missionId, " +
//            "AVG(r.recordTotalCost) AS missionAverage) " +
//            "FROM Record r " +
//            "JOIN r.memberMission mm " +
//            "WHERE mm.mission.missionId = :missionId")
//    CompareMissionDto getMissionAverage(@Param("missionId") String missionId);
//
//    @Query("SELECT AVG(s.SpendingCost) FROM Spending s WHERE spendingCategoryId= :categoryId GROUP BY DAY(s.SpendingDate")
//    Double FindEntireAverageByCategoryIdAndDay(@Param("categoryId")int categoryId);
    // 월간 카테고리별 합계
    @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MonthCategoryResponse(SUM(s.spendingCost) AS spendingCostSum, MONTH(s.spendingDate) AS spendingMonth,s.member.memberEmail,s.spendingCategoryId)FROM Spending s WHERE s.member.memberEmail= :memberEmail AND YEAR(s.spendingDate)=:spendingYear AND MONTH(s.spendingDate)=:spendingMonth GROUP BY s.spendingCategoryId, s.member.memberEmail ORDER BY SUM(s.spendingCost) DESC ")
    List<MonthCategoryResponse> findMonthSumByCategory(@Param("memberEmail")String memberEmail, @Param("spendingYear") int spendingYear, @Param("spendingMonth")int spendingMonth);

    // 제일 첫번째 지출이 발생한 날짜 반환
    @Query("SELECT MIN(s.spendingDate) From Spending s WHERE s.member.memberEmail =:memberEmail")
    LocalDateTime findFirstSpending(@Param("memberEmail") String memberEmail);
    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.MissionStatsResponse(s.member.memberEmail, SUM(s.spendingCost) AS sum, " +
            "(SELECT AVG(s2.spendingCost) FROM Spending s2 WHERE s2.spendingCategoryId = s.spendingCategoryId AND s2.record.memberMission.mission.missionId = :missionId ) AS missionAvg, " +
            "s.spendingCategoryId AS categoryId) " +
            "FROM Spending s " +
            "WHERE s.member.memberEmail = :memberEmail " +
            "  AND s.record.memberMission.mission.missionId = :missionId " +
            "GROUP BY s.member.memberEmail, s.spendingCategoryId")
    MissionStatsResponse getCategorySumAndAverageByMissionAndMember(@Param("memberEmail") String memberEmail, @Param("missionId") String missionId);
//    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.MissionMemberSumDto(" +
//            "s.spendingCategoryId AS spendingCategory, SUM(s.spendingCost) AS sum ) " +
//            "FROM Record r " +
//            "JOIN r.spendingList s" +
//            "JOIN r.memberMission.mm " +
//            "JOIN mm.mission.m " +
//            "WHERE m.missionId = :missionId AND s.spendingDate BETWEEN :start AND :end " +
//            "GROUP BY s.spendingCategoryId" )
//    List<MissionMemberSumDto> getMissionMemberSum(@Param("missionId") String missionId, @Param("start")Date start, @Param("end")Date end);


//    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.MissionMemberSumDto(" +
//            "s.spendingCategoryId AS spendingCategory, SUM(s.spendingCost) AS sum ) " +
//            "FROM Spending s " +
//            "JOIN s.member m " +
//            "JOIN m.memberMission mm " +
//            "WHERE mm.mission.missionId = :missionId " +
//            "AND s.spendingDate BETWEEN :startDate AND :endDate " +
//            "GROUP BY s.spendingCategoryId")
//    List<MissionMemberSumDto> getMissionMemberSum(@Param("missionId") String missionId, @Param("startDate") Date startDate,@Param("endDate") Date endDate);

    @Query("SELECT NEW com.doacha.seesaw.model.dto.mission.MissionMemberSumDto( " +
            "s.spendingCategoryId, SUM(s.spendingCost)) " +
            "FROM Spending s " +
            "JOIN MemberMission mm ON s.member.memberEmail = mm.member.memberEmail " +
            "WHERE mm.mission.missionId = :missionId AND s.member.memberEmail!= :memberEmail AND s.spendingCategoryId !=0 AND s.spendingCategoryId != 20 AND s.spendingDate BETWEEN :startDate AND :endDate " +
            "GROUP BY s.spendingCategoryId")
    List<MissionMemberSumDto> getMissionMemberSum(@Param("missionId") String missionId, @Param("memberEmail")String memberEmail, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
    @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MemberSpendingSumDto(s.member.memberNickname AS memberNickname, s.spendingCategoryId AS categoryId, SUM(s.spendingCost) AS sum) FROM Spending s WHERE s.member.memberEmail= :memberEmail AND s.spendingCategoryId !=0 AND s.spendingCategoryId != 20 AND s.spendingDate BETWEEN :start AND :end GROUP BY s.spendingCategoryId " )
    List<MemberSpendingSumDto> getMemberSumByCategory(@Param("memberEmail")String memberEmail, @Param("start")Date start, @Param("end")Date end);


    @Query("SELECT new com.doacha.seesaw.model.dto.spending.RecordSpendingResponse(s.spendingTitle,s.spendingCost)FROM Spending s " +
            "WHERE s.record.recordId = :recordId "+
            "ORDER BY s.spendingDate ASC")
    List<RecordSpendingResponse> findRecordSpendingResponseByRecordId(@Param("recordId") long recordId);
}

