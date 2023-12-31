package com.doacha.seesaw.controller;

import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.exception.ForbiddenException;
import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.mission.*;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.model.service.MemberMissionService;
import com.doacha.seesaw.model.service.MissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@Tag(name = "Mission", description = "Mission API")
@RequestMapping("/mission")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class MissionController {

    @Autowired
    MissionService missionService;

    @Autowired
    MemberMissionService memberMissionService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";


    // 미션 목록
    @Operation(summary = "미션 목록", description = "미션 목록 불러오는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 불러오기 성공"),
            @ApiResponse(responseCode = "500", description = "미션 불러오기 실패 - 서버 오류")
    })
    @GetMapping()
//  public ResponseEntity<?> getMissionList(@Parameter(hidden = true)@PageableDefault(size=6, sort="missionCreationTime",direction = Sort.Direction.DESC) Pageable pageable) {
    public ResponseEntity<?> getMissionList(@PageableDefault(size = 6, sort = "missionCreationTime", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("미션 목록 불러오기");
        log.info("페이지번호 : {}", String.valueOf(pageable.getPageNumber()));
        try {
            List<MissionListResponse> list = missionService.getMissionList(pageable);
            log.info("미션 불러오기 성공");

            return new ResponseEntity<List<MissionListResponse>>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 불러오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 미션 생성
    @Operation(summary = "미션 생성", description = "새로운 미션 생성하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 생성 성공"),
            @ApiResponse(responseCode = "500", description = "미션 생성 실패 - 서버 오류")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createMission(@RequestPart(value = "image", required = false) MultipartFile image, @RequestPart(value = "createMissionRequest") CreateMissionRequest createMissionRequest) {
        log.info("새로운 미션 정보: " + createMissionRequest);
        try {
            log.info("미션 생성");
            Mission newMission = missionService.createMission(image, createMissionRequest);
            log.info("미션 생성 성공");
            log.info("미션 생성한 멤버 정보 저장 시도");
            memberMissionService.registCreateMemberMission(newMission, createMissionRequest.getMemberMissionSavingMoney());
            log.info("미션 생성한 멤버 정보 저장 성공");
            return new ResponseEntity<>(newMission, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 생성 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 미션 참여
    @Operation(summary = "미션 참여", description = "미션에 참여하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 참여 성공"),
            @ApiResponse(responseCode = "500", description = "미션 참여 실패 - 서버 오류")
    })
    @PutMapping()
    public ResponseEntity<?> participateMission(@RequestBody ParticipateMissionRequest participateMissionRequest) {
        log.info("미션 참여");
        try {
            log.info("미션 참여한 멤버 정보 저장 시도");
            memberMissionService.registParticipateMemberMission(participateMissionRequest);
            log.info("미션 참여한 멤버 정보 저장 성공");
            log.info("미션 인원 수 늘리기");
            missionService.updateMissionMemberCount(participateMissionRequest.getMissionId(), 1);
            log.info("미션 참여 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (BadRequestException e) {
            log.info("미션 참여 실패 - 인원수 초과");
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.info("미션 참여 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 미션 검색
    @Operation(summary = "미션 검색", description = "미션 검색하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 검색 성공"),
            @ApiResponse(responseCode = "500", description = "미션 검색 실패 - 서버 오류")
    })
    @GetMapping("/search")
    public ResponseEntity<?> searchMission(SearchMissionRequest searchMissionRequest, @Parameter(hidden = true) @PageableDefault(size = 6, sort = "missionCreationTime", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("미션 검색");
        try {
            List<MissionListResponse> list = missionService.searchMission(pageable, searchMissionRequest);
            log.info("미션 검색 성공");
            return new ResponseEntity<List<MissionListResponse>>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 검색 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary="미션 카테고리 선택시 해당 카테고리 월 평균")
    @PostMapping("/monthaverage")
    public ResponseEntity<?> monthAverage(@RequestBody SpendingAverageRequest spendingAverageRequest){
        try{
            SpendingAverageResponse spendingAverageResponse= missionService.getSpendingAverage(spendingAverageRequest.getCategoryId(), spendingAverageRequest.getMemberEmail());
            return new ResponseEntity<>(spendingAverageResponse, HttpStatus.OK);
        }
        catch(Exception e ){
            return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Operation(summary="미션 기간만큼 과거와 비교")
    @PostMapping("/saving")
    public ResponseEntity<?> missionSaving(@RequestBody QuitMissionRequest quitMissionRequest){
        try{
            MissionSavingResponse missionSavingResponse = missionService.getMissionSavingResponse(quitMissionRequest.getMissionId(),quitMissionRequest.getMemberEmail());
            return new ResponseEntity<MissionSavingResponse> (missionSavingResponse, HttpStatus.OK);
        }
        catch(Exception e ){
            return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Operation(summary = "미션 통계", description = "미션 통계 API")
    @PostMapping("/stats")
    public ResponseEntity<?> getMissionStats(@RequestBody GetMemberMissionTnumRequest getMemberMissionTnumRequest) {
        try {
            MissionStatsResponse missionStatsResponseList = missionService.getCategorySumAndAverageByMissionAndMember(getMemberMissionTnumRequest.getMemberEmail(), getMemberMissionTnumRequest.getMissionId());
            return new ResponseEntity<MissionStatsResponse>(missionStatsResponseList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Operation
    @PostMapping("/comparestats")
    public ResponseEntity<?> getCompareStats (@RequestBody QuitMissionRequest quitMissionRequest){
        try{
            CompareWithMissionMemberResponse compareWithMissionMemberResponse = missionService.getCompareMissionMemberStats(quitMissionRequest.getMemberEmail(),quitMissionRequest.getMissionId());
            return new ResponseEntity<>(compareWithMissionMemberResponse,HttpStatus.OK);
        }
        catch(Exception e ){
            return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "미션 총 사용 금액 중 최근 5개")
    @PostMapping("/recentstats")
    public ResponseEntity<?> RecentFiveMission(@RequestBody QuitMissionRequest quitMissionRequest) {
        try {
            List<RecentMissionResponse> recentMissionResponses =
                    missionService.getRecentMissionStats(quitMissionRequest.getMissionId(), quitMissionRequest.getMemberEmail());
            return new ResponseEntity<>(recentMissionResponses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "완료 미션 기준으로 최근 기간 동안의 해당 카테고리 소비 총합")
    @PostMapping("/periodsum")
    public ResponseEntity<?> getMySpendingSum(@RequestBody QuitMissionRequest quitMissionRequest) {
        try {
            Long mySpendingSum = missionService.getMySpendingSum(quitMissionRequest.getMissionId(), quitMissionRequest.getMemberEmail());
            return new ResponseEntity<>(mySpendingSum, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "내 미션 통계")
    @PostMapping("/mystats")
    public ResponseEntity<?> MyMissionStatResponse(@RequestBody QuitMissionRequest quitMissionRequest) {
        MyMissionStatResponse myMissionStatResponse = missionService.getMyMissionStats(quitMissionRequest.getMissionId(), quitMissionRequest.getMemberEmail());
        if (myMissionStatResponse != null) {
            return new ResponseEntity<>(myMissionStatResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Operation(summary = "카테고리별 전체 평균과 그룹 평균 비교")
    @GetMapping("/compare/{missionId}")
    public ResponseEntity<?> compareMission(@PathVariable String missionId) {
        try {
            CompareMissionResponse compareMissionResponse = missionService.getCompareMissionAverage(missionId);
            return new ResponseEntity<CompareMissionResponse>(compareMissionResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary="완료 미션 랭킹", description = "미션내에 알뜰왕, 큰손, 과소비대장 조회하는 API")
    @GetMapping("/ranking/{missionId}")
    public ResponseEntity<?>getMissionRanking(@PathVariable String missionId){
        try{
            MissionRankingResponse missionRankingResponse = missionService.getMissionRanking(missionId);
            log.info("완료 미션 랭킹 조회 성공");
            return new ResponseEntity<>(missionRankingResponse,HttpStatus.OK);
        }
        catch(Exception e){
            log.info("완료 미션 랭킹 조회 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 미션 상세
    @Operation(summary = "미션 상세", description = "미션 상세 정보 가져오는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 상세 불러오기 성공"),
            @ApiResponse(responseCode = "204", description = "미션 상세 불러오기 실패 - 존재하지 않는 그룹"),
            @ApiResponse(responseCode = "500", description = "미션 상세 불러오기 실패 - 서버 오류")
    })
    @GetMapping("detail/{missionId}")
    public ResponseEntity<?> getMissionDetail(@PathVariable String missionId) {
        log.info("미션 상세 가져오기");
        try {
            Optional<Mission> mission = missionService.getMissionDetail(missionId);
            log.info("미션 상세 가져오기 성공");
            return new ResponseEntity<Optional<Mission>>(mission, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("미션 상세 가져오기 실패 - missionId: {}인 미션 없음", missionId);
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("미션 상세 가져오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 미션 탈퇴
    @Operation(summary = "미션 탈퇴", description = "미션 탈퇴하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 탈퇴 성공"),
            @ApiResponse(responseCode = "409", description = "미션 탈퇴 실패 - 이미 시작된 미션"),
            @ApiResponse(responseCode = "500", description = "미션 탈퇴 실패 - 서버 오류")
    })
    @PostMapping("/quit")
    public ResponseEntity<?> quitMission(@RequestBody QuitMissionRequest quitMissionRequest) {
        log.info("미션 탈퇴");
        try {
            memberMissionService.quitMission(quitMissionRequest);

            log.info("미션 인원 수 줄이기");
            Mission updatedMission = missionService.updateMissionMemberCount(quitMissionRequest.getMissionId(), -1);

            log.info("남은 인원 수 : {}", updatedMission.getMissionMemberCount());
            if (updatedMission.getMissionMemberCount() == 0) {
                log.info("남은 참가자 없음 - 미션 삭제");
                missionService.deleteMission(quitMissionRequest.getMissionId());
                log.info("미션 삭제 성공");
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            }

            log.info("미션 탈퇴 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (ForbiddenException e) {
            log.info(e.getMessage());
            return new ResponseEntity<String>(FAIL, HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            log.info("미션 탈퇴 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 미션 상세 - 나의 현황 - 예치금 현황
    @Operation(summary = "미션 상세 - 나의 현황 - 예치금 현황", description = "미션 총 인원 / 미션 실패 인원 / 내가 받을 수 있는 예치금 / 미션 실패 가능 기회 / 현재 미션 실패 횟수 반환하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "나의 현황 불러오기 성공"),
            @ApiResponse(responseCode = "500", description = "나의 현황 불러오기 실패 - 서버 오류")
    })
    @PostMapping("/deposit-condition")
    public ResponseEntity<?> getDepositCondition(@RequestBody GetMyMissionDataRequest getMyMissionDataRequest) {
        log.info("미션 상세 - 나의 현황");
        try {
            GetDepositConditionResponse depositCondition = memberMissionService.getDepositCondition(getMyMissionDataRequest);
            log.info("나의 현황 불러오기 성공");
            return new ResponseEntity<GetDepositConditionResponse>(depositCondition, HttpStatus.OK);
        } catch (Exception e) {
            log.info("나의 현황 불러오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 카카오페이 결제 번호 반환
//    @Operation( summary = "결제 번호 불러오기", description = "카카오페이 결제번호 불러오는 API")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "결제번호 불러오기 성공"),
//            @ApiResponse(responseCode = "500", description = "결제번호 불러오기 성공 실패 - 서버 오류")
//    })
//    @PostMapping("/tnum")
//    public ResponseEntity<?> getMemberMissionTnum(@RequestBody GetMemberMissionTnumRequest getMemberMissionTnumRequest) {
//        log.info("결제 번호 불러오기");
//        try {
//            String tnum = memberMissionService.getMemberMissionTnum(getMemberMissionTnumRequest);
//            log.info("결제 번호 불러오기 성공");
//            return new ResponseEntity<String>(tnum, HttpStatus.OK);
//        } catch (Exception e) {
//            log.info("결제 번호 불러오기 실패 - 서버 오류");
//            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @Operation(summary = "적금 계좌이체 테스트", description = "적금 계좌이체 테스트용")
    @GetMapping("/test1")
    public ResponseEntity<String> test1() {
        log.info("적금 계좌 이체 테스트");
        try {
            memberMissionService.requestTransfer();
            log.info("테스트 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("테스트 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "예치금 계좌이체 테스트", description = "예치금 계좌이체 테스트용")
    @GetMapping("/test2")
    public ResponseEntity<String> test2() {
        log.info("예치금 계좌 이체 테스트");
        try {
            memberMissionService.returnDeposit();
            log.info("테스트 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("테스트 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "미션 참여자 목록", description = "미션 참여자의 프사&닉네임 목록 조회 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 참여자 목록 불러오기 성공"),
            @ApiResponse(responseCode = "204", description = "미션 참여자 목록 불러오기 실패 - 존재하지 않는 그룹"),
            @ApiResponse(responseCode = "500", description = "미션 참여자 목록 불러오기 실패 - 서버 오류")
    })
    @GetMapping("members/{missionId}")
    public ResponseEntity<?> getMissionMemberList(@PathVariable String missionId) {
        log.info("미션 참여자 목록 가져오기");
        try {
            List<MissionMemberResponse> missionMemberResponseList = memberMissionService.getMissionMemberList(missionId);
            log.info("미션 참여자 목록 가져오기 성공");
            return new ResponseEntity<List<MissionMemberResponse>>(missionMemberResponseList, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 참여자 목록 가져오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "나의 미션 목록", description = "나의 미션 목록 불러오는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "나의 미션 불러오기 성공"),
            @ApiResponse(responseCode = "500", description = "나의 미션 불러오기 실패 - 서버 오류")
    })
    @PostMapping("/mymission")
    public ResponseEntity<?> getMyMissionList(@RequestBody MyMissionRequest myMissionRequest) {
        log.info(myMissionRequest.getMemberEmail()+"의 미션 목록 불러오기");
//        log.info("페이지번호 : {}", String.valueOf(pageable.getPageNumber()));
        try {
            List<MissionListResponse> list = missionService.getMyMissionList(myMissionRequest);
            log.info(myMissionRequest.getMemberEmail()+ "의 미션 목록 불러오기 성공");

            return new ResponseEntity<List<MissionListResponse>>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.info(myMissionRequest.getMemberEmail()+ "의 미션 목록 불러오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 완료 미션 상단 기본 정보
    @Operation(summary = "완료미션 상단 기본 정보", description = "제목 이미지 시작일 끝일 성공여부 설명 카테고리")
    @PostMapping("/endinfo")
    public EndMissionInfoResponse getMissionEndInfo(@RequestBody GetMyMissionDataRequest getMyMissionDataRequest) {
        return memberMissionService.getMissionEndInfo(getMyMissionDataRequest);
    }
}
