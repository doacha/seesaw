package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.MemberMissionId;
import com.doacha.seesaw.model.entity.MemberMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberMissionRepository extends JpaRepository<MemberMission, MemberMissionId> {

//    @Query("SELECT mm.memberMissionTnum FROM MemberMission mm WHERE mm.mission.id = :missionId AND mm.member.memberEmail = :memberEmail")
//    String findMemberMissionTnumByMissionIdAndMemberEmail(@Param("missionId") String missionId,@Param("memberEmail") String memberEmail);

    @Query("SELECT mm From MemberMission mm WHERE mm.mission.id = :missionId AND mm.member.memberEmail = :memberEmail")
    MemberMission findByMissionIdAndMemberEmail(@Param("missionId") String missionId,@Param("memberEmail") String memberEmail);
}
