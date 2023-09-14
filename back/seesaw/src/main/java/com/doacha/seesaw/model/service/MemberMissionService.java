package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.ParticipateMissionRequest;
import com.doacha.seesaw.model.dto.QuitMissionRequest;
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
    public void registCreateMemberMission(Mission mission, boolean isSaving) {
        Member member = memberRepository.findById(mission.getMissionHostEmail()).get();
        MemberMission memberMission = MemberMission.builder()
                .member(member)
                .mission(mission)
                .memberMissionIsSaving(isSaving)
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
                .memberMissionIsSaving(participateMissionRequest.isMemberMissionIsSavings())
                .memberMissionStatus(0)
                .build();

        memberMissionRepository.save(memberMission);
    }

    // 미션 참여한 멤버 정보 삭제
    public void deleteMemberMission(QuitMissionRequest quitMissionRequest) {
        MemberMission memberMission = memberMissionRepository.findByMissionIdAndMemberEmail(quitMissionRequest.getMissionId(), quitMissionRequest.getMemberEmail());
        memberMissionRepository.delete(memberMission);
    }

    // 카카오페이 결제 번호 반환
//    public String getMemberMissionTnum(GetMemberMissionTnumRequest getMemberMissionTnumRequest) {
//        return memberMissionRepository.findMemberMissionTnumByMissionIdAndMemberEmail(getMemberMissionTnumRequest.getMissionId(), getMemberMissionTnumRequest.getMemberEmail());
//    }
}
