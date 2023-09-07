package com.doacha.seesaw.controller;

import com.doacha.seesaw.model.dto.MonthSpendingRequest;
import com.doacha.seesaw.model.dto.MonthSpendingResponse;
import com.doacha.seesaw.model.dto.SpendingUpdateRequest;
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
    public ResponseEntity<?> postSpending(@RequestBody Spending spending){
        try{spendingService.save(spending);
        return new ResponseEntity<>(spending, HttpStatus.OK);
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

    @PutMapping()
    @Operation(summary="지출 수정")
    public ResponseEntity<?> updateSpending(SpendingUpdateRequest spendingUpdateRequest){
        try{
            spendingService.update(spendingUpdateRequest);
            return new ResponseEntity<>(spendingUpdateRequest,HttpStatus.OK);}
        catch(Exception e){
            return new ResponseEntity<>("fail",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping()
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

    @GetMapping("/list")
    @Operation(summary="최신, 금액순 정렬")
    public ResponseEntity<Page<MonthSpendingResponse>> getSpendingList(@PageableDefault(page = 0, size = 10,
            sort = "spendingDate", direction = Sort.Direction.DESC) Pageable pageable, @RequestBody MonthSpendingRequest monthSpendingRequest){
        Page<MonthSpendingResponse> spendingPage =spendingService.findAllByMemberMemberEmailAndSpendingDateYearAndSpendingDateMonth(pageable, monthSpendingRequest.getMemberEmail(), monthSpendingRequest.getSpendingYear(), monthSpendingRequest.getSpendingMonth());
        return new ResponseEntity<>(spendingPage, HttpStatus.OK);
    }


}
