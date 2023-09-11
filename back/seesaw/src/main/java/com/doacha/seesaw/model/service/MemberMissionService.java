package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.GetMemberMissionTnumRequest;
import com.doacha.seesaw.model.dto.MemberMissionId;
import com.doacha.seesaw.model.dto.ParticipateMissionRequest;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.MemberMission;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MemberRepository;
import com.doacha.seesaw.repository.MissionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MemberMissionService {

    @Autowired
    MemberMissionRepository memberMissionRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MissionRepository missionRepository;

    // 미션 생성한 멤버 정보 저장
    public void registCreateMemberMission(Mission mission, int deposit, String tnum) {
        Member member = memberRepository.findById(mission.getMissionHostEmail()).get();
        MemberMission memberMission = MemberMission.builder()
                .member(member)
                .mission(mission)
                .memberMissionDeposit(deposit)
                .memberMissionStatus(0)
                .memberMissionTnum(tnum)
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
                .memberMissionDeposit(participateMissionRequest.getMemberMissionDeposit())
                .memberMissionStatus(0)
                .memberMissionTnum(participateMissionRequest.getMemberMissionTnum())
                .build();

        memberMissionRepository.save(memberMission);
    }

    // 미션 참여한 멤버 정보 삭제
    public void deleteMemberMission(MemberMissionId memberMissionId) {
        MemberMission memberMission = memberMissionRepository.findById(memberMissionId).get();
        memberMissionRepository.delete(memberMission);
    }

    // 카카오페이 결제 번호 반환
    public String getMemberMissionTnum(GetMemberMissionTnumRequest getMemberMissionTnumRequest) {
        return memberMissionRepository.findMemberMissionTnumByMissionIdAndMemberEmail(getMemberMissionTnumRequest.getMissionId(), getMemberMissionTnumRequest.getMemberEmail());
    }
}
