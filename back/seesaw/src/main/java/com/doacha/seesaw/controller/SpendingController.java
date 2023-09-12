package com.doacha.seesaw.controller;

import com.doacha.seesaw.model.dto.*;
import com.doacha.seesaw.model.entity.Spending;
import com.doacha.seesaw.model.service.SpendingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@RestController
@Tag(name = "Spending", description = "Spending API")
@RequestMapping("/spending")
@RequiredArgsConstructor
@CrossOrigin("*")
@Slf4j
public class SpendingController {
    private final SpendingService spendingService;

    @PostMapping()
    @Operation(summary="지출 등록")
    public ResponseEntity<?> postSpending(@RequestBody SpendingDto spendingdto){
        try{spendingService.save(spendingdto);
        return new ResponseEntity<>(spendingdto, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<String>("fail",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{spendingId}")
    @Operation(summary="지출 상세보기")
    public ResponseEntity<?> detailSpending(@PathVariable Long spendingId){
        try{
            Optional<Spending> spending = spendingService.read(spendingId);
        return new ResponseEntity<Spending>(spending.get(),HttpStatus.OK);}
        catch(Exception e ){
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    @Operation(summary="지출 수정")
    public ResponseEntity<?> updateSpending(@RequestBody SpendingUpdateRequest spendingUpdateRequest){
        try{
            spendingService.update(spendingUpdateRequest);
            return new ResponseEntity<>(spendingUpdateRequest,HttpStatus.OK);}
        catch(Exception e){
            return new ResponseEntity<>("fail",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/delete/{spendingId}")
    @Operation(summary="지출 삭제")
    public ResponseEntity<?> deleteSpending(@PathVariable Long spendingId){
        try{
            spendingService.delete(spendingId);
            return new ResponseEntity<>("success",HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("fail",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/list")
    @Operation(summary="최신, 금액순 정렬")
    public ResponseEntity<List<MonthSpendingResponse>> getSpendingList(@RequestBody MonthSpendingRequest monthSpendingRequest){
        List<MonthSpendingResponse> spendingList =spendingService.findAllByMemberEmailAndSpendingYearAndSpendingMonth(monthSpendingRequest.getMemberEmail(), monthSpendingRequest.getSpendingYear(), monthSpendingRequest.getSpendingMonth(),monthSpendingRequest.getCondition());
        return new ResponseEntity<>(spendingList, HttpStatus.OK);
    }

    @PostMapping("/dailysum")
    @Operation(summary="전체 일 합계")
    public ResponseEntity<List<DailySpendingSumResponse>> getDailySum(@RequestBody SpendingSumRequest spendingSumRequest){
        List<DailySpendingSumResponse> dailySpendingSumList=spendingService.findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(spendingSumRequest.getMemberEmail(), spendingSumRequest.getSpendingYear(), spendingSumRequest.getSpendingMonth());
        return new ResponseEntity<>(dailySpendingSumList,HttpStatus.OK);
    }

    @PostMapping("/monthsum")
    @Operation(summary="전체 월 합계")
    public ResponseEntity<List<MonthSpendingSumResponse>> getMonthSum(@RequestBody SpendingSumRequest spendingSumRequest){
        List<MonthSpendingSumResponse> monthSpendingSumList = spendingService.findMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(spendingSumRequest.getMemberEmail(), spendingSumRequest.getSpendingYear(), spendingSumRequest.getSpendingMonth());
        return new ResponseEntity<>(monthSpendingSumList, HttpStatus.OK);
    }

    @PostMapping("/category")
    @Operation(summary="월 별 카테고리")
    public ResponseEntity<List<MonthCategoryResponse>> getMonthCategory(@RequestBody SpendingSumRequest spendingSumRequest){
        List<MonthCategoryResponse> monthCategorygSumList = spendingService.findMonthSumByCategory(spendingSumRequest.getMemberEmail(), spendingSumRequest.getSpendingYear(), spendingSumRequest.getSpendingMonth());
        return new ResponseEntity<>(monthCategorygSumList, HttpStatus.OK);
    }


}
