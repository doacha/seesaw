package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.ForbiddenException;
import com.doacha.seesaw.model.dto.SavingList;
import com.doacha.seesaw.model.dto.SavingRequest;
import com.doacha.seesaw.model.dto.account.AccountTransferResponse;
import com.doacha.seesaw.model.dto.mission.*;
import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.MemberMission;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MemberRepository;
import com.doacha.seesaw.repository.MissionRepository;
import com.doacha.seesaw.repository.RecordRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

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


    @Value("${seesaw_account_number}")
    private String accountNumber;

    @Value("${seesaw_account_password}")
    private String password;

    @Value("${seesawBank_api}")
    private String seesawBank_api;

    // 미션 생성한 멤버 정보 저장
    public void registCreateMemberMission(Mission mission, int savingMoney) {
        Member member = memberRepository.findById(mission.getMissionHostEmail()).get();
        MemberMission memberMission = MemberMission.builder()
                .member(member)
                .mission(mission)
                .memberMissionSavingMoney(savingMoney)
                .memberMissionRefund(mission.getMissionDeposit())
                .memberMissionIsSaving(false)
                .memberMissionStatus(0)
                .build();
        memberMissionRepository.save(memberMission);
    }

    // 미션 참여한 멤버 정보 저장
    public void registParticipateMemberMission(ParticipateMissionRequest participateMissionRequest) {
        Member member = memberRepository.findById(participateMissionRequest.getMemberEmail()).get();
        Mission mission = missionRepository.findById(participateMissionRequest.getMissionId()).get();

        if(mission.getMissionMemberCount() == mission.getMissionMaxCount()){
            throw new BadRequestException("모집 인원 초과");
        }
        
        MemberMission memberMission = MemberMission.builder()
                .member(member)
                .mission(mission)
                .memberMissionSavingMoney(participateMissionRequest.getMemberMissionSavingMoney())
                .memberMissionRefund(mission.getMissionDeposit())
                .memberMissionIsSaving(false)
                .memberMissionStatus(0)
                .build();

        memberMissionRepository.save(memberMission);
    }

    // 미션 상세 - 나의 현황
    public GetDepositConditionResponse getDepositCondition(GetMyMissionDataRequest getMyMissionDataRequest) {
        String missionId = getMyMissionDataRequest.getMissionId();
        String memberEmail = getMyMissionDataRequest.getMemberEmail();

        MemberMission mm = memberMissionRepository.findByMissionIdAndMemberEmail(missionId, memberEmail);
        Mission mission = missionRepository.findById(missionId).get();

        int totalMemberCnt = mission.getMissionMemberCount(); // 미션 총 인원
        int failMemberCnt = memberMissionRepository.countFail(missionId);// 미션 실패 인원
        int deposit = mission.getMissionDeposit(); // 미션 예치금
        int failCnt = (int)(mission.getMissionTotalCycle()*0.2); // 실패 기준 횟수
        int myFailCnt = recordRepository.countFail(missionId, memberEmail); // 나의 실패 횟수

        int changedDeposit = 0;
        if(mm.getMemberMissionStatus() == 3) {
            // 실패한 사람의 예치금 변화 = 현재 남은 예치금 - 기존 예치금
            changedDeposit = mm.getMemberMissionRefund()-deposit;
            log.info("실패한 멤버의 예치금 변화 - {}", changedDeposit);
        }else{
            // 성공한 사람의 예치금 변화 = 모인 벌금 / 성공한 사람 수(총인원 - 실패한 사람 수)
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

    // 끝난 미션 정보 보내기
    public EndMissionInfoResponse getMissionEndInfo(GetMyMissionDataRequest getMyMissionDataRequest){
        Member member = memberRepository
                .findByMemberEmail(getMyMissionDataRequest.getMemberEmail())
                .orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));

        Mission mission = missionRepository
                .findById(getMyMissionDataRequest
                        .getMissionId()).orElseThrow(()-> new BadRequestException("유효하지 않은 미션입니다."));

        MemberMission memberMission = memberMissionRepository.findByMissionIdAndMemberEmail(mission.getMissionId(), member.getMemberEmail());

        //제목 이미지 시작일 끝일 성공여부 설명 카테고리
        EndMissionInfoResponse endMissionInfoResponse = new EndMissionInfoResponse(
                mission.getMissionTitle(),
                mission.getMissionImgUrl(),
                mission.getMissionStartDate(),
                dateAdd(mission.getMissionStartDate(), mission.getMissionTotalCycle()*mission.getMissionPeriod()-1),
                memberMission.getMemberMissionStatus(),
                mission.getMissionPurpose(),
                mission.getMissionCategoryId(),
                mission.getMissionPeriod(),
                mission.getMissionTotalCycle(),
                mission.getMissionTargetPrice()
        );
        return endMissionInfoResponse;
    }

    public String dateAdd(Date date, int plus){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        cal.add(Calendar.DATE, plus);
        return df.format(cal.getTime());
    }


    // 적금 계좌 이체 (매일 오전 3시마다 실행)
    @Scheduled(cron = "0 10 4 * * *")
    public void requestTransfer(){
        List<SavingList> list = memberMissionRepository.findSavingListByMemberMissionIsSaving();

        for(SavingList saving: list){
            // 각각의 적금건에 대해 이체 요청 하기
            SavingRequest request = SavingRequest.builder()
                    .mainAccount(saving.getMemberMainAccount())
                    .savingAccount(saving.getMemberSavingAccount())
                    .accountApprovalAmount(saving.getMemberMissionSavingMoney())
                    .build();

            Mono<String> mono = WebClient.create()
                    .post()
                    .uri(seesawBank_api+"/account-transactional/saving")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(String.class);

            mono.subscribe(response -> {
                if (!response.equals("fail")) {
                    // 적금 이체 완료 되었으면 DB에서 memberMissionIsSaving false로 바꿔주기
                    memberMissionRepository.updateMemberMissionIsSaving(saving.getMemberEmail(), saving.getMissionId());
                } else {
                    // 적금 이체 실패하면 어떻게 할지는 나중에 생각하자
                    System.out.println("Request failed or returned a different response: " + response);
                }
            });
        }
    }

    // 예치금 반환 (매일 오전 10시마다 실행)
    @Scheduled(cron = "0 0 10 * * *")
    public void returnDeposit(){
        // 예치금 반환해야할 목록 불러오기
        List<ReturnDepositList> list = memberMissionRepository.findReturnDepositList();
        log.info("예치금 반환 목록 - {}",list);

        for(ReturnDepositList returnDeposit: list){
            AccountTransferRequest request = AccountTransferRequest.builder()
                    .accountNum(returnDeposit.getMemberMainAccount())
                    .accountTransactionNum(accountNumber)
                    .accountApprovalAmount(returnDeposit.getMemberMissionRefund())
                    .accountPassword(password)
                    .build();

            Mono<String> mono = WebClient.create()
                    .post()
                    .uri(seesawBank_api+"/account-transactional/transfer")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(String.class);
        }
    }

    // 미션 참여자 목록(닉네임, 프로필 사진) 가져오기
    public List<MissionMemberResponse> getMissionMemberList(String missionId) {
        return memberMissionRepository.findMissionMemberResponseByMissionId(missionId);
    }

    public void quitMission(QuitMissionRequest quitMissionRequest) {
        MemberMission memberMission = memberMissionRepository.findByMissionIdAndMemberEmail(quitMissionRequest.getMissionId(), quitMissionRequest.getMemberEmail());
        log.info("예치금 환불");
        AccountTransferRequest request = AccountTransferRequest.builder()
                .accountNum(memberMission.getMember().getMemberMainAccount())
                .accountTransactionNum(accountNumber)
                .accountApprovalAmount(memberMission.getMemberMissionRefund())
                .accountPassword(password)
                .build();

        Mono<AccountTransferResponse> mono = WebClient.create()
                .post()
                .uri(seesawBank_api+"/account-transactional/transfer")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AccountTransferResponse.class);

        mono.subscribe(response -> {
            if(response.getAccountApprovalAmount() != memberMission.getMemberMissionRefund()) {
                throw new ForbiddenException("예치금 환불 실패로 인한 미션 탈퇴 실패");
            }
        });
        log.info("미션 탈퇴한 멤버 정보 삭제");
        memberMissionRepository.delete(memberMission);
    }

    // 카카오페이 결제 번호 반환
//    public String getMemberMissionTnum(GetMemberMissionTnumRequest getMemberMissionTnumRequest) {
//        return memberMissionRepository.findMemberMissionTnumByMissionIdAndMemberEmail(getMemberMissionTnumRequest.getMissionId(), getMemberMissionTnumRequest.getMemberEmail());
//    }
}
