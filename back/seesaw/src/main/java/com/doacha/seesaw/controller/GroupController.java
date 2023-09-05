package com.doacha.seesaw.controller;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.entity.Group;
import com.doacha.seesaw.model.service.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Tag(name = "Group", description = "Mission Group API")
@RequestMapping("/mission")
@CrossOrigin("*")
@Slf4j
public class GroupController {

    @Autowired
    GroupService groupService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";


    // 그룹 목록
    @Operation(
            summary = "미션 그룹 목록",
            description = "미션 그룹 목록 불러오는 API"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "그룹 목록 불러오기 성공"),
            @ApiResponse(responseCode = "500", description = "그룹 목록 불러오기 실패 - 서버 오류")
    })
    @GetMapping()
    public ResponseEntity<?> getGroupList(@PageableDefault (size = 6) Pageable pageable) {
        log.info("미션 그룹 목록 불러오기");
        log.info("페이지번호 : {}",String.valueOf(pageable.getPageNumber()));
        try {
            Page<Group> list = groupService.getGroupList(pageable);
            log.info("미션 그룹 불러오기 성공");
            return new ResponseEntity<Page<Group>>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.info("미션 그룹 불러오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 그룹 생성
    @Operation(
            summary = "그룹 생성",
            description = "새로운 미션 그룹 생성하는 API"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "그룹 생성 성공"),
            @ApiResponse(responseCode = "500", description = "그룹 생성 실패 - 서버 오류")
    })
    @PostMapping()
    public ResponseEntity<?> createGroup(@RequestBody Group group) {
        log.info("새로운 그룹 정보: " + group);
        log.info("그룹 생성");
        try {
            Group newGroup = groupService.createGroup(group);
            log.info("그룹 생성 성공");
            //UserGroupService 호출해서 UserGroup에 추가하는 부분 추가해야함!
            return new ResponseEntity<>(newGroup, HttpStatus.OK);
        } catch (Exception e) {
            log.info("그룹 생성 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 그룹 참여
    // 카카오페이 결제 => 결제 완료 후 현재 인원수 + 1 => user_group 테이블에 추가

    // 그룹 검색

    // 그룹 추천

    // 그룹 상세
    @Operation(summary = "그룹 상세", description = "그룹 상세 정보 가져오는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "그룹 상세 불러오기 성공"),
            @ApiResponse(responseCode = "204", description = "그룹 상세 불러오기 실패 - 존재하지 않는 그룹"),
            @ApiResponse(responseCode = "500", description = "그룹 상세 불러오기 실패 - 서버 오류")
    })
    @GetMapping("/{groupId}")
    public ResponseEntity<?> getGroupDetail(@PathVariable String groupId) {
        log.info("그룹 상세 가져오기");
        try {
            Optional<Group> group = groupService.getGroupDetail(groupId);
            log.info("그룹 상세 가져오기 성공");
            return new ResponseEntity<Group>(group.get(), HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("게시글 상세 가져오기 실패 - groupId: {}인 그룹 없음", groupId);
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("게시글 상세 가져오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
