package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.MissionListResponse;
import com.doacha.seesaw.model.entity.Mission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MissionRepository extends JpaRepository<Mission, String> { //JpaRepository<Entity클래스, PK타입>

    @Query("SELECT new com.doacha.seesaw.model.dto.MissionListResponse(m.missionId, m.missionTitle, m.missionMemberCount, m.missionMaxCount, m.missionImgUrl, m.missionMinDeposit) FROM Mission m WHERE m.missionIsPublic = true")
    Page<MissionListResponse> findAllByMissionIsPublic(Pageable pageable);
    @Query("SELECT new com.doacha.seesaw.model.dto.MissionListResponse(m.missionId, m.missionTitle, m.missionMemberCount, m.missionMaxCount, m.missionImgUrl, m.missionMinDeposit) FROM Mission m WHERE m.missionIsPublic = true AND LOWER(m.missionTitle) LIKE %:keyword%")
    Page<MissionListResponse> findAllByMissionIsPublicAndMissionTitleLike(@Param("keyword") String keyword, Pageable pageable);


}
