package com.doacha.seesaw.controller;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.MissionListResponse;
import com.doacha.seesaw.model.dto.MissionParticipateRequest;
import com.doacha.seesaw.model.entity.Mission;
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


    // 미션 그룹 생성
    @Operation( summary = "미션 그룹 생성", description = "새로운 미션 그룹 생성하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미션 그룹 생성 성공"),
            @ApiResponse(responseCode = "500", description = "미션 그룹 생성 실패 - 서버 오류")
    })
    @PostMapping()
    public ResponseEntity<?> createMission(@RequestBody Mission mission) {
        log.info("새로운 그룹 정보: {}" + mission);
        log.info("그룹 생성");

        log.info("결제 시도");
        // 결제 완료 후 유저 그룹 테이블에 유저이메일, 그룹 아이디, 결제 금액 등등 저장

        try {
            Mission newMission = missionService.createMission(mission);
            log.info("그룹 생성 성공");
            //MemberMissionService 호출해서 MemberMission에 추가하는 부분 추가해야함!
            return new ResponseEntity<>(newMission, HttpStatus.OK);
        } catch (Exception e) {
            log.info("그룹 생성 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 미션 참여
    @Operation( summary = "미션 그룹 참여", description = "미션 그룹에 참여하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "그룹 참여 성공"),
            @ApiResponse(responseCode = "500", description = "그룹 참여 실패 - 서버 오류")
    })
    @PutMapping("/participate")
    public ResponseEntity<?> updateMission(@RequestBody MissionParticipateRequest missionParticipateRequest) {
        log.info("그룹 참여");

        log.info("결제 시도");
        // 결제 완료 후 유저 그룹 테이블에 유저이메일, 그룹 아이디, 결제 금액 등등 저장


        try {
            log.info("그룹 인원 수 늘리기");
            missionService.updateMissionMemberCount(missionParticipateRequest.getMissionId());
            log.info("그룹 참여 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("그룹 참여 실패 - 서버 오류");
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
    public ResponseEntity<?> searchmission(@PathVariable String keyword, @Parameter(hidden = true)@PageableDefault(size=6, sort="missionCreationTime",direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("미션 검색");
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
    @Operation(summary = "미션 그룹 상세", description = "미션 그룹 상세 정보 가져오는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "그룹 상세 불러오기 성공"),
            @ApiResponse(responseCode = "204", description = "그룹 상세 불러오기 실패 - 존재하지 않는 그룹"),
            @ApiResponse(responseCode = "500", description = "그룹 상세 불러오기 실패 - 서버 오류")
    })
    @GetMapping("detail/{missionId}")
    public ResponseEntity<?> getmissionDetail(@PathVariable String missionId) {
        log.info("그룹 상세 가져오기");
        try {
            Optional<Mission> mission = missionService.getMissionDetail(missionId);
            log.info("그룹 상세 가져오기 성공");
            return new ResponseEntity<Optional<Mission>>(mission, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("그룹 상세 가져오기 실패 - missionId: {}인 그룹 없음", missionId);
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("그룹 상세 가져오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 미션 추천
}
