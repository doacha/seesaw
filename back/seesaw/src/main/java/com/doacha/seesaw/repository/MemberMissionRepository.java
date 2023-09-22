package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.MemberMissionId;
import com.doacha.seesaw.model.dto.mission.MyPageMissionListResponse;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.MemberMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberMissionRepository extends JpaRepository<MemberMission, MemberMissionId> {

//    @Query("SELECT mm.memberMissionTnum FROM MemberMission mm WHERE mm.mission.id = :missionId AND mm.member.memberEmail = :memberEmail")
//    String findMemberMissionTnumByMissionIdAndMemberEmail(@Param("missionId") String missionId,@Param("memberEmail") String memberEmail);

    @Query("SELECT mm From MemberMission mm WHERE mm.mission.id = :missionId AND mm.member.memberEmail = :memberEmail")
    MemberMission findByMissionIdAndMemberEmail(@Param("missionId") String missionId,@Param("memberEmail") String memberEmail);

    @Query("SELECT COUNT(*) FROM MemberMission mm WHERE mm.member.memberEmail = :memberEmail AND mm.memberMissionStatus = :missionStatus")
    int countMissionsByMemberIdAndMissionStatus(@Param("memberEmail") String memberEmail, @Param("missionStatus") int missionStatus);

    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MyPageMissionListResponse(" +
            "mm.mission.missionId, mm.mission.missionTitle, mm.mission.missionImgUrl, " +
            " mm.mission.missionStartDate, date_add(DAY, (mm.mission.missionTotalCycle)*(mm.mission.missionPeriod)-1, mm.mission.missionStartDate), mm.memberMissionStatus) " +
            "FROM MemberMission mm " +
            "WHERE mm.member.memberEmail = :memberEmail " )
    List<MyPageMissionListResponse> findMyPageMissionList(@Param("memberEmail") String memberEmail);

    List<MemberMission> findMemberMissionByMember(Member member);
}
