package com.doacha.seesaw.controller;

import com.doacha.seesaw.model.dto.SpendingDto;
import com.doacha.seesaw.model.entity.Spending;
import com.doacha.seesaw.model.service.SpendingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> postSpending(@RequestBody SpendingDto spendingDto){
        spendingService.save(spendingDto);
        return new ResponseEntity<>(spendingDto, HttpStatus.OK);
    }
    @GetMapping("/{spendingId}")
    @Operation(summary="지출 상세보기")
    public ResponseEntity<?> detailSpending(@PathVariable int spendingId){
        Spending spending = spendingService.read(spendingId);
        return new ResponseEntity<Spending>(spending,HttpStatus.OK);
    }

    @PutMapping()
    @Operation(summary="지출 수정")
    public ResponseEntity<?> updateSpending(SpendingDto spendingDto){
        spendingService.update(spendingDto);
        return new ResponseEntity<>(spendingDto,HttpStatus.OK);
    }


}
