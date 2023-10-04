package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.SavingList;
import com.doacha.seesaw.model.dto.mission.MissionListResponse;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.Mission;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MissionRepository extends JpaRepository<Mission, String>, JpaSpecificationExecutor<Mission> { //JpaRepository<Entity클래스, PK타입>

    Optional<Mission> findById(@Param("missionId") String missionId);
    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MissionListResponse(" +
            "m.missionId, m.missionTitle, m.missionMemberCount, m.missionMaxCount, m.missionImgUrl, " +
            "m.missionTargetPrice, m.missionPeriod, m.missionTotalCycle, m.missionStartDate, m.missionCategoryId) " +
            "FROM Mission m WHERE m.missionIsPublic = true")
    List<MissionListResponse> findMissionListResponseByMissionByIsPublic(Pageable pageable);


    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MissionListResponse(" +
            "m.missionId, m.missionTitle, m.missionMemberCount, m.missionMaxCount, m.missionImgUrl, " +
            "m.missionTargetPrice, m.missionPeriod, m.missionTotalCycle, m.missionStartDate, m.missionCategoryId) " +
            "FROM Mission m " +
            "WHERE (:keyword IS NULL OR m.missionTitle LIKE %:keyword%) " +
            "AND (:missionCategoryId IS NULL OR m.missionCategoryId = :missionCategoryId) " +
            "AND (:missionPeriod IS NULL OR m.missionPeriod = :missionPeriod) " +
            "AND (:missionCycle IS NULL OR m.missionTotalCycle = :missionCycle)" +
            "AND m.missionIsPublic = true")
    List<MissionListResponse> searchMissions(String keyword, Integer missionCategoryId, Integer missionPeriod, Integer missionCycle, Pageable pageable);

    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MissionListResponse(" +
            "m.missionId, m.missionTitle, m.missionMemberCount, m.missionMaxCount, m.missionImgUrl, " +
            "m.missionTargetPrice, m.missionPeriod, m.missionTotalCycle, m.missionStartDate, m.missionCategoryId) " +
            "FROM Mission m " +
            "INNER JOIN MemberMission mm ON m.missionId = mm.mission.missionId " +
            "WHERE mm.member.memberEmail = :memberEmail")
    List<MissionListResponse> findMissionListResponseByMemberEmail(@Param("memberEmail") String memberEmail, Pageable pageable);
}
