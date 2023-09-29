package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.MemberMissionId;
import com.doacha.seesaw.model.dto.SavingList;
import com.doacha.seesaw.model.dto.mission.MissionMemberResponse;
import com.doacha.seesaw.model.dto.mission.MyPageMissionListResponse;
import com.doacha.seesaw.model.dto.mission.ReturnDepositList;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.MemberMission;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Query("SELECT COUNT(mm) FROM MemberMission mm WHERE mm.mission.missionId = :missionId AND mm.memberMissionStatus = 3")
    int countFail(String missionId);

    @Query("SELECT new com.doacha.seesaw.model.dto.SavingList(" +
            "mm.member.memberEmail, " +
            "mm.mission.missionId, " +
            "mm.member.memberMainAccount, " +
            "mm.member.memberSavingAccount, " +
            "mm.memberMissionSavingMoney) " +
            "FROM MemberMission mm " +
            "WHERE mm.memberMissionIsSaving = true " )
    List<SavingList> findSavingListByMemberMissionIsSaving();

    @Modifying
    @Transactional
    @Query("UPDATE MemberMission mm SET mm.memberMissionIsSaving = false WHERE mm.member.memberEmail = :memberEmail AND mm.mission.missionId = :missionId")
    void updateMemberMissionIsSaving(@Param("memberEmail") String memberEmail, @Param("missionId") String missionId);

    @Query(value = "SELECT mm.member_email as memberEmail, " +
            "mm.mission_id as missionId, " +
            "m.member_main_account as memberMainAccount, " +
            "mm.member_mission_refund as memberMissionRefund " +
            "FROM member_mission mm " +
            "INNER JOIN member m ON mm.member_email = m.member_email " +
            "INNER JOIN mission msn ON mm.mission_id = msn.mission_id " +
            "WHERE DATE_ADD(msn.mission_start_date, INTERVAL msn.mission_total_cycle * msn.mission_period DAY) = CURRENT_DATE", nativeQuery = true)
    List<ReturnDepositList> findReturnDepositList();

    @Query("SELECT new com.doacha.seesaw.model.dto.mission.MissionMemberResponse( " +
            "mm.member.memberNickname, " +
            "mm.member.memberImgUrl) " +
            "FROM MemberMission mm " +
            "WHERE mm.mission.missionId = :missionId " )
    List<MissionMemberResponse> findMissionMemberResponseByMissionId(@Param("missionId") String missionId);
}
