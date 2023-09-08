package com.doacha.seesaw.controller;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.*;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.model.service.MemberMissionService;
import com.doacha.seesaw.model.service.MissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Tag(name = "Mission", description = "Mission API")
@RequestMapping("/mission")
@CrossOrigin("*")
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
    public ResponseEntity<?> getMissionList(@Parameter(hidden = true)@PageableDefault(size=6, sort="missionCreationTime",direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("미션 목록 불러오기");
        log.info("페이지번호 : {}", String.valueOf(pageable.getPageNumber()));
        try {
            Page<MissionListResponse> list = missionService.getMissionList(pageable);
            log.info("미션 불러오기 성공");
            return new ResponseEntity<Page<MissionListResponse>>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 불러오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 미션 생성
    @Operation( summary = "미션 생성", description = "새로운 미션 생성하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 생성 성공"),
            @ApiResponse(responseCode = "500", description = "미션 생성 실패 - 서버 오류")
    })
    @PostMapping()
    public ResponseEntity<?> createMission(@RequestBody CreateMissionRequest createMissionRequest) {
        log.info("새로운 미션 정보: " + createMissionRequest);
        try {
            log.info("미션 생성");
            Mission newMission = missionService.createMission(createMissionRequest);
            log.info("미션 생성 성공");
            log.info("미션 생성한 멤버 정보 저장 시도");
            memberMissionService.registCreateMemberMission(newMission, createMissionRequest.getMemberMissionDeposit(), createMissionRequest.getMemberMissionTnum());
            log.info("미션 생성한 멤버 정보 저장 성공");
            return new ResponseEntity<>(newMission, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 생성 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 미션 참여
    @Operation( summary = "미션 참여", description = "미션에 참여하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 참여 성공"),
            @ApiResponse(responseCode = "500", description = "미션 참여 실패 - 서버 오류")
    })
    @PutMapping()
    public ResponseEntity<?> participateMission(@RequestBody ParticipateMissionRequest participateMissionRequest) {
        log.info("미션 참여");
        try {
            log.info("미션 참여한 멤버 정보 저장 시도");
            memberMissionService .registParticipateMemberMission(participateMissionRequest);
            log.info("미션 참여한 멤버 정보 저장 성공");
            log.info("미션 인원 수 늘리기");
            missionService.updateMissionMemberCount(participateMissionRequest.getMissionId(), 1);
            log.info("미션 참여 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
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
    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchMission(@PathVariable String keyword, @Parameter(hidden = true)@PageableDefault(size=6, sort="missionCreationTime",direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("미션 검색");
        log.info(keyword);
        try {
            Page<MissionListResponse> list = missionService.searchMission(pageable, keyword);
            log.info("미션 검색 성공");
            return new ResponseEntity<Page<MissionListResponse>>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 검색 실패 - 서버 오류");
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
    @Operation( summary = "미션 탈퇴", description = "미션 탈퇴하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 탈퇴 성공"),
            @ApiResponse(responseCode = "500", description = "미션 탈퇴 실패 - 서버 오류")
    })
    @PostMapping("/quit")
    public ResponseEntity<?> quitMission(@RequestBody MemberMissionId memberMissionId) {
        log.info("미션 탈퇴");
        try {
            log.info("미션 탈퇴한 멤버 정보 삭제");
            memberMissionService.deleteMemberMission(memberMissionId);
            log.info("미션 탈퇴한 멤버 정보 삭제 성공");
            log.info("미션 인원 수 줄이기");
            missionService.updateMissionMemberCount(memberMissionId.getMission().getMissionId(), -1);
            log.info("미션 탈퇴 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 탈퇴 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    // 카카오페이 결제 번호 반환
    @Operation( summary = "결제 번호 불러오기", description = "카카오페이 결제번호 불러오는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "결제번호 불러오기 성공"),
            @ApiResponse(responseCode = "500", description = "결제번호 불러오기 성공 실패 - 서버 오류")
    })
    @PostMapping("/tnum")
    public ResponseEntity<?> getMemberMissionTnum(@RequestBody GetMemberMissionTnumRequest getMemberMissionTnumRequest) {
        log.info("결제 번호 불러오기");
        try {
            String tnum = memberMissionService.getMemberMissionTnum(getMemberMissionTnumRequest);
            log.info("결제 번호 불러오기 성공");
            return new ResponseEntity<String>(tnum, HttpStatus.OK);
        } catch (Exception e) {
            log.info("결제 번호 불러오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}
