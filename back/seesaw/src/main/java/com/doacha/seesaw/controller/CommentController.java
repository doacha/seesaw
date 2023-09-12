package com.doacha.seesaw.controller;

import com.doacha.seesaw.model.dto.CommentRequest;
import com.doacha.seesaw.model.dto.CommentResponse;
import com.doacha.seesaw.model.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Comment", description = "Comment API")
@RequestMapping("/comment")
@CrossOrigin("*")
@Slf4j
public class CommentController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    CommentService commentService;

    // 댓글 등록
    @Operation( summary = "댓글 작성", description = "댓글 작성하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 작성 성공"),
            @ApiResponse(responseCode = "500", description = "댓글 작성 실패 - 서버 오류")
    })
    @PostMapping()
    public ResponseEntity<?> registComment(@RequestBody CommentRequest commentRequest) {
        log.info("댓글 작성");
        try{
            CommentResponse comment = commentService.registComment(commentRequest);
            log.info("댓글 작성 성공");
            return new ResponseEntity<CommentResponse>(comment, HttpStatus.OK);
        }catch (Exception e) {
            log.info("댓글 작성 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    // 댓글 목록
    @Operation( summary = "댓글 목록", description = "댓글 목록 조회하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 목록 조회 성공"),
            @ApiResponse(responseCode = "500", description = "댓글 목록 조회 - 서버 오류")
    })
    @GetMapping("/{recordId}")
    public ResponseEntity<?> getCommentList(@PathVariable Long recordId) {
        log.info("댓글 목록 조회");
        try{
            List<CommentResponse> list = commentService.getCommentList(recordId);
            log.info("댓글 목록 조회 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }catch (Exception e) {
            log.info("댓글 목록 조회 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 댓글 수정
    @Operation( summary = "댓글 수정", description = "댓글 수정하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 수정 성공"),
            @ApiResponse(responseCode = "500", description = "댓글 수정 실패 - 서버 오류")
    })
    @PutMapping()
    public ResponseEntity<?> updateComment(@RequestBody CommentRequest commentRequest) {
        log.info("댓글 수정");
        try{
            CommentResponse comment = commentService.updateComment(commentRequest);
            log.info("댓글 수정 성공");
            return new ResponseEntity<CommentResponse>(comment, HttpStatus.OK);
        }catch (Exception e) {
            log.info("댓글 수정 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    // 댓글 삭제
    @Operation( summary = "댓글 삭제", description = "댓글 삭제하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 삭제 성공"),
            @ApiResponse(responseCode = "500", description = "댓글 삭제 실패 - 서버 오류")
    })
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        log.info("댓글 삭제");
        try{
            commentService.deleteComment(commentId);
            log.info("댓글 삭제 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }catch (Exception e) {
            log.info("댓글 삭제 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
