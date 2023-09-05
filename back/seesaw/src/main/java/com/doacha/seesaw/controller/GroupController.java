package com.doacha.seesaw.controller;

import com.doacha.seesaw.model.entity.Group;
import com.doacha.seesaw.model.service.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        log.info("게시글 작성");
        try {
            Group newGroup = groupService.createGroup(group);
            log.info("그룹 생성 성공");
            return new ResponseEntity<>(newGroup, HttpStatus.OK);
        } catch (Exception e) {
            log.info("그룹 생성 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 그룹 참여

    // 그룹 검색

    // 그룹 추천

    // 그룹 상세
}
