package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.mission.GetMyMissionDataRequest;
import com.doacha.seesaw.model.dto.mission.ParticipateMissionRequest;
import com.doacha.seesaw.model.dto.mission.QuitMissionRequest;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.MemberMission;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.model.entity.Record;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MemberRepository;
import com.doacha.seesaw.repository.MissionRepository;
import com.doacha.seesaw.repository.RecordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                .memberMissionStatus(0)
                .build();

        memberMissionRepository.save(memberMission);
    }

    // 미션 참여한 멤버 정보 삭제
    public void deleteMemberMission(QuitMissionRequest quitMissionRequest) {
        MemberMission memberMission = memberMissionRepository.findByMissionIdAndMemberEmail(quitMissionRequest.getMissionId(), quitMissionRequest.getMemberEmail());
        memberMissionRepository.delete(memberMission);
    }

    // 내가 받을 수 있는 예치금
//    public void getReturnDeposit(GetMyMissionDataRequest getMyMissionDataRequest) {
//        String missionId = getMyMissionDataRequest.getMissionId();
//        String memberEmail = getMyMissionDataRequest.getMemberEmail();
//
//        MemberMission mm = memberMissionRepository.findByMissionIdAndMemberEmail(missionId, memberEmail);
//        Mission mission = missionRepository.findById(missionId).get();
//
//        int totalCycle = mission.getMissionTotalCycle(); // 미션 총 횟수
//        int deposit = mission.getMissionDeposit(); // 미션 예치금
//        int failCnt = (int)(totalCycle*0.8); // 실패 기준 횟수
//        int minusDeposit = (int)(deposit*(totalCycle-failCnt)*0.01); // fialCnt 이후로 1회 실패 시 차감 금액
//
//        int ans = 0;
//
//        if(mm.getMemberMissionStatus() == 3) { // 실패한 사람은 예치금 얼마 잃을지 계산
//            int myFailCnt = recordRepository.countFail(missionId, memberEmail);
//            if(myFailCnt == totalCycle) ans = -deposit;
//            else ans = -(myFailCnt-failCnt)*minusDeposit;
//        }else{
//            // 성공인 사람은 상금 얼마 받을지 계산
//
//        }
//    }

    // 카카오페이 결제 번호 반환
//    public String getMemberMissionTnum(GetMemberMissionTnumRequest getMemberMissionTnumRequest) {
//        return memberMissionRepository.findMemberMissionTnumByMissionIdAndMemberEmail(getMemberMissionTnumRequest.getMissionId(), getMemberMissionTnumRequest.getMemberEmail());
//    }
}
