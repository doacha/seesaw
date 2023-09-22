package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.mission.DailyTopSpendingResponse;
import com.doacha.seesaw.model.dto.mission.MissionFrugalSpendingResponse;
import com.doacha.seesaw.model.dto.mission.MissionTopSpendingResponse;
import com.doacha.seesaw.model.dto.record.RecordListResponse;
import com.doacha.seesaw.model.dto.record.RecordResponse;
import com.doacha.seesaw.model.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {

    @Query("SELECT new com.doacha.seesaw.model.dto.record.RecordListResponse(r.recordId, mm.member.memberNickname, r.recordTotalCost, r.recordStatus) " +
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

    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MissionTopSpendingResponse(mm.member.memberNickname AS missionTopSpender, SUM(r.recordTotalCost) AS missionTopSpending) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId " +
            "GROUP BY mm.member.memberNickname " +
            "ORDER BY SUM(r.recordTotalCost) DESC")
    MissionTopSpendingResponse getMissionTopSpender(@Param("missionId") String missionId);


    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MissionFrugalSpendingResponse(mm.member.memberNickname AS missionFrugalSpender, SUM(r.recordTotalCost) AS missionFrugalSpending) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId " +
            "GROUP BY mm.member.memberNickname " +
            "ORDER BY SUM(r.recordTotalCost) ASC")
    MissionFrugalSpendingResponse getMissionFrugalSpender(@Param("missionId") String missionId);


    @Query("SELECT new com.doacha.seesaw.model.dto.mission.DailyTopSpendingResponse (mm.member.memberNickname AS dailyTopSpender, MAX(r.recordTotalCost) AS dailyTopSpending,r.recordNumber AS dailyTopSpendingNum) " +
            "FROM Record r " +
            "JOIN r.memberMission mm " +
            "WHERE mm.mission.missionId = :missionId " +
            "GROUP BY mm.member.memberNickname " +
            "ORDER BY r.recordTotalCost DESC ")
    DailyTopSpendingResponse getDailyTopSpender(@Param("missionId") String missionId);

}
