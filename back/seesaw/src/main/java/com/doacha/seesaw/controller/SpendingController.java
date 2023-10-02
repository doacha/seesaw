package com.doacha.seesaw.controller;

import com.doacha.seesaw.exception.ForbiddenException;
import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.mission.QuitMissionRequest;
import com.doacha.seesaw.model.dto.spending.*;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.model.service.SpendingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@Tag(name = "Spending", description = "Spending API")
@RequestMapping("/spending")
@RequiredArgsConstructor
@CrossOrigin(origins="*", allowedHeaders = "*")
@Slf4j
public class SpendingController {
    private final SpendingService spendingService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @PostMapping()
    @Operation(summary="지출 등록")
    public ResponseEntity<?> postSpending(@RequestBody SpendingDto spendingdto){
        try{spendingService.save(spendingdto);
            return new ResponseEntity<>(spendingdto, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{spendingId}")
    @Operation(summary="지출 상세보기")
    public ResponseEntity<?> detailSpending(@PathVariable Long spendingId){
        try{
            SpendingDetailResponse spendingDetailResponse = spendingService.detailResponse(spendingId);
            return new ResponseEntity<SpendingDetailResponse>(spendingDetailResponse,HttpStatus.OK);}
        catch(Exception e ){
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    @Operation(summary="지출 수정")
    public ResponseEntity<?> updateSpending(@RequestBody SpendingUpdateRequest spendingUpdateRequest){
        try{
            log.info("지출 수정");
            spendingService.update(spendingUpdateRequest);
            return new ResponseEntity<>(spendingUpdateRequest,HttpStatus.OK);
        } catch(NoContentException e){
            log.info(spendingUpdateRequest.getSpendingId()+"에 해당하는 spending 존재하지 않음");
            return new ResponseEntity<>(FAIL,HttpStatus.NO_CONTENT);
        } catch(ForbiddenException e){
            log.info(e.getMessage());
            return new ResponseEntity<>(FAIL,HttpStatus.FORBIDDEN);
        } catch(Exception e){
            log.info("지출 수정 성공");
            return new ResponseEntity<>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/delete/{spendingId}")
    @Operation(summary="지출 삭제")
    public ResponseEntity<?> deleteSpending(@PathVariable Long spendingId){
        try{
            log.info("지출 삭제");
            spendingService.delete(spendingId);
            return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
        } catch(NoContentException e){
            log.info(spendingId+"에 해당하는 spending 존재하지 않음");
            return new ResponseEntity<>(FAIL,HttpStatus.NO_CONTENT);
        } catch(ForbiddenException e){
            log.info(e.getMessage());
            return new ResponseEntity<>(FAIL,HttpStatus.FORBIDDEN);
        } catch(Exception e){
            log.info("지출 삭제 성공");
            return new ResponseEntity<>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/list")
    @Operation(summary="최신, 금액순 정렬")
    public ResponseEntity<?> getSpendingList(@RequestBody MonthSpendingRequest monthSpendingRequest){
        log.info("가계부 목록 불러오기");
        try{
            List<MonthSpendingResponse> spendingList =spendingService.findAllByMemberEmailAndSpendingYearAndSpendingMonth(monthSpendingRequest.getMemberEmail(), monthSpendingRequest.getSpendingYear(), monthSpendingRequest.getSpendingMonth(),monthSpendingRequest.getCondition());
            log.info("가계부 목록 불러오기 성공");
            return new ResponseEntity<>(spendingList, HttpStatus.OK);
        } catch (Exception e) {
            log.info("가계부 목록 불러오기 실패");
            return new ResponseEntity<>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/dailysum")
    @Operation(summary="전체 일 합계")
    public ResponseEntity<?> getDailySum(@RequestBody SpendingSumRequest spendingSumRequest){
        try{List<DailySpendingSumResponse> dailySpendingSumList=spendingService.findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(spendingSumRequest.getMemberEmail(), spendingSumRequest.getSpendingYear(), spendingSumRequest.getSpendingMonth());
            return new ResponseEntity<>(dailySpendingSumList,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/monthsum")
    @Operation(summary="전체 월 합계")
    public ResponseEntity<?> getMonthSum(@RequestBody SpendingSumRequest spendingSumRequest){
        try {MonthSpendingSumResponse monthSpendingSum = spendingService.findAllMonthSumByMemberEmailAndSpendingYear(spendingSumRequest.getMemberEmail(), spendingSumRequest.getSpendingYear(), spendingSumRequest.getSpendingMonth());
            return new ResponseEntity<>(monthSpendingSum, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/category")
    @Operation(summary="월 별 카테고리")
    public ResponseEntity<List<MonthCategoryResponse>> getMonthCategory(@RequestBody SpendingSumRequest spendingSumRequest){
        List<MonthCategoryResponse> monthCategorygSumList = spendingService.findMonthSumByCategory(spendingSumRequest.getMemberEmail(), spendingSumRequest.getSpendingYear(), spendingSumRequest.getSpendingMonth());
        return new ResponseEntity<>(monthCategorygSumList, HttpStatus.OK);
    }

    @PostMapping("/compare")
    @Operation(summary="분석 결과 전달과 비교")
    public ResponseEntity<?> getMonthCompare(@RequestBody SpendingSumRequest spendingSumRequest){
        try {
            MonthCompareResponse monthCompareResponse = spendingService.findMonthDifferenceByMemberEmailAndSpendingYearAndSpendingMonth(spendingSumRequest.getMemberEmail(), spendingSumRequest.getSpendingYear(), spendingSumRequest.getSpendingMonth());
            return new ResponseEntity<>(monthCompareResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation( summary = "가계부에 카드내역 불러오기", description = "가계부에 카드내역 불러오기 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "가계부에 카드내역 불러오기 성공"),
            @ApiResponse(responseCode = "500", description = "가계부에 카드내역 불러오기 실패 - 서버 오류")
    })
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshSpending(@RequestBody String memberEmail) {
        log.info("가계부에 카드내역 불러오기");
        try {
            spendingService.refreshSpending(memberEmail);
            log.info("가계부에 카드내역 불러오기 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("가계부에 카드내역 불러오기 실패 - 서버 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
