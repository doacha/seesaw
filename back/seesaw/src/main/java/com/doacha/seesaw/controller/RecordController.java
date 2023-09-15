package com.doacha.seesaw.controller;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.record.RecordListRequest;
import com.doacha.seesaw.model.dto.record.RecordListResponse;
import com.doacha.seesaw.model.dto.record.RecordRequest;
import com.doacha.seesaw.model.dto.record.RecordResponse;
import com.doacha.seesaw.model.service.RecordService;
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
@Tag(name = "Record", description = "Record API")
@RequestMapping("/record")
@CrossOrigin("*")
@Slf4j
public class RecordController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    RecordService recordService;


    // 글 작성
    @Operation( summary = "글 작성", description = "글 작성하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "글 작성 성공"),
            @ApiResponse(responseCode = "500", description = "글 작성 실패 - 서버 오류")
    })
    @PutMapping("/write")
    public ResponseEntity<?> writeRecord(@RequestBody RecordRequest recordRequest) {
        log.info("작성 글 정보: " + recordRequest);
        log.info("글 작성");
        try {
            RecordResponse newRecord = recordService.writeRecord(recordRequest);
            log.info("글 작성 성공");
            return new ResponseEntity<>(newRecord, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("글 작성 실패 - {}번 레코드 없음", recordRequest.getRecordId());
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("글 작성 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 글 수정
    @Operation( summary = "글 수정", description = "글 수정하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "글 수정 성공"),
            @ApiResponse(responseCode = "500", description = "글 수정 실패 - 서버 오류")
    })
    @PutMapping("/update")
    public ResponseEntity<?> updateRecord(@RequestBody RecordRequest recordRequest) {
        log.info("글 수정");
        try {
            RecordResponse updatedRecord = recordService.updateRecord(recordRequest);
            log.info("글 수정 성공");
            return new ResponseEntity<RecordResponse>(updatedRecord, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("글 수정 실패 - {}번 레코드 없음", recordRequest.getRecordId());
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("글 수정 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 글 삭제
    @Operation( summary = "글 삭제", description = "글 삭제하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "글 삭제 성공"),
            @ApiResponse(responseCode = "500", description = "글 삭제 실패 - 서버 오류")
    })
    @PutMapping("/{recordId}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long recordId) {
        log.info("글 삭제");
        try {
            recordService.deleteRecord(recordId);
            log.info("글 삭제 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("글 삭제 실패 - {}번 레코드 없음", recordId);
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("글 삭제 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 글 상세
    @Operation( summary = "글 상세", description = "글 상세 정보 불러오는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "글 상세 정보 불러오기 성공"),
            @ApiResponse(responseCode = "500", description = "글 상세 정보 불러오기 실패 - 서버 오류")
    })
    @GetMapping("/{recordId}")
    public ResponseEntity<?> getRecordDetail(@PathVariable long recordId) {
        log.info("글 상세 가져오기");
        try {
            RecordResponse record = recordService.getRecordDetail(recordId);
            log.info("글 상세 가져오기 성공");
            return new ResponseEntity<RecordResponse>(record, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("게시글 상세 가져오기 실패 - {}번 게시글 없음", recordId);
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("게시글 상세 가져오기 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 글 목록
    @Operation( summary = "글 목록", description = "글 목록 불러오는 API (사용자 닉네임, 사용금액, 성공여부를 금액기준 오름차순으로)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "글 목록 불러오기 성공"),
            @ApiResponse(responseCode = "500", description = "글 목록 불러오기 실패 - 서버 오류")
    })
    @PostMapping()
    public ResponseEntity<?> getRecordList(@RequestBody RecordListRequest recordListRequest) {
        log.info("글 목록 불러오기");
        try {
            List<RecordListResponse> list = recordService.getRecordList(recordListRequest.getMissionId(), recordListRequest.getRecordNumber());
            log.info("게시글 목록 불러오기 성공");
            return new ResponseEntity<List<RecordListResponse>>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.info("게시글 목록 불러오기 실패 - 서버(DB)오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
