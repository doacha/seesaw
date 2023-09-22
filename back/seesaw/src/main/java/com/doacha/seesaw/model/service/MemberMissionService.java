package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.mission.GetMyMissionDataRequest;
import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.model.dto.mission.MyPageMissionListResponse;
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
