package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.mission.*;
import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.MemberMission;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MemberRepository;
import com.doacha.seesaw.repository.MissionRepository;
import com.doacha.seesaw.repository.RecordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class MemberMissionService {

    @Autowired
    MemberMissionRepository memberMissionRepository;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MissionRepository missionRepository;

    // 미션 생성한 멤버 정보 저장
    public void registCreateMemberMission(Mission mission, int savingMoney) {
        Member member = memberRepository.findById(mission.getMissionHostEmail()).get();
        MemberMission memberMission = MemberMission.builder()
                .member(member)
                .mission(mission)
                .memberMissionSavingMoney(savingMoney)
                .memberMissionIsSaving(false)
                .memberMissionStatus(0)
                .build();
        memberMissionRepository.save(memberMission);
    }

    // 미션 참여한 멤버 정보 저장
    public void registParticipateMemberMission(ParticipateMissionRequest participateMissionRequest) {
        Member member = memberRepository.findById(participateMissionRequest.getMemberEmail()).get();
        Mission mission = missionRepository.findById(participateMissionRequest.getMissionId()).get();

        MemberMission memberMission = MemberMission.builder()
                .member(member)
                .mission(mission)
                .memberMissionSavingMoney(participateMissionRequest.getMemberMissionSavingMoney())
                .memberMissionIsSaving(false)
                .memberMissionStatus(0)
                .build();

        memberMissionRepository.save(memberMission);
    }

    // 미션 참여한 멤버 정보 삭제
    public void deleteMemberMission(QuitMissionRequest quitMissionRequest) {
        MemberMission memberMission = memberMissionRepository.findByMissionIdAndMemberEmail(quitMissionRequest.getMissionId(), quitMissionRequest.getMemberEmail());
        memberMissionRepository.delete(memberMission);
    }


    // 미션 상세 - 나의 현황
    public GetDepositConditionResponse getDepositCondition(GetMyMissionDataRequest getMyMissionDataRequest) {
        String missionId = getMyMissionDataRequest.getMissionId();
        String memberEmail = getMyMissionDataRequest.getMemberEmail();

        MemberMission mm = memberMissionRepository.findByMissionIdAndMemberEmail(missionId, memberEmail);
        Mission mission = missionRepository.findById(missionId).get();

        int totalMemberCnt = mission.getMissionMemberCount(); // 미션 총 인원
        int failMemberCnt = memberMissionRepository.countFail(missionId);// 미션 실패 인원
        int totalCycle = mission.getMissionTotalCycle(); // 미션 총 횟수
        int deposit = mission.getMissionDeposit(); // 미션 예치금
        int failCnt = (int)(totalCycle*0.2); // 실패 기준 횟수
        int myFailCnt = recordRepository.countFail(missionId, memberEmail); // 나의 실패 횟수
        int minusDeposit = (int)(deposit*(totalCycle-failCnt)*0.01); // failCnt 이후로 1회 실패 시 차감 금액

        int changedDeposit = 0;
        if(mm.getMemberMissionStatus() == 3) { // 실패한 사람은 예치금 얼마 잃을지 계산
            if(myFailCnt == totalCycle) changedDeposit = -deposit; // 다 실패한 사람은 예치금 다 잃음
            else changedDeposit = -(myFailCnt-failCnt)*minusDeposit; // 아니면 실패한 퍼센트만큼 잃음
        }else{// 성공인 사람은 상금 얼마 받을지 계산
            // 모인 벌금 / 성공한 사람 수(총인원 - 실패한 사람 수)
            changedDeposit = mission.getMissionPenaltyPrice()/(totalMemberCnt-failMemberCnt);
        }
        GetDepositConditionResponse depositCondition = GetDepositConditionResponse.builder()
                .missionMemberCnt(totalMemberCnt)
                .missionFailMemberCnt(failMemberCnt)
                .changedDeposit(changedDeposit)
                .failCnt(failCnt)
                .myFailCnt(myFailCnt)
                .build();

        return depositCondition;
    }

    // 미션 리스트 가져오기(마이페이지
    public List<MyPageMissionListResponse> getMyPageMissionList(String memberEmail){
        Member member = memberRepository
                .findByMemberEmail(memberEmail)
                .orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));

        List<MemberMission> memberMissions = memberMissionRepository.findMemberMissionByMember(member);
        List<MyPageMissionListResponse> myPageMissionListResponses = new ArrayList<>();
        for(MemberMission memberMission : memberMissions){
            myPageMissionListResponses.add(new MyPageMissionListResponse(
                    memberMission.getMission().getMissionId(),
                    memberMission.getMission().getMissionTitle(),
                    memberMission.getMission().getMissionImgUrl(),
                    memberMission.getMission().getMissionStartDate(),
                    dateAdd(memberMission.getMission().getMissionStartDate(), memberMission.getMission().getMissionTotalCycle()*memberMission.getMission().getMissionPeriod()-1),
                    memberMission.getMemberMissionStatus()
            ));
        }
        return myPageMissionListResponses;
    }

    public String dateAdd(Date date, int plus){
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        cal.add(Calendar.DATE, plus);
        return df.format(cal.getTime());
    }


    // 카카오페이 결제 번호 반환
//    public String getMemberMissionTnum(GetMemberMissionTnumRequest getMemberMissionTnumRequest) {
//        return memberMissionRepository.findMemberMissionTnumByMissionIdAndMemberEmail(getMemberMissionTnumRequest.getMissionId(), getMemberMissionTnumRequest.getMemberEmail());
//    }
}
