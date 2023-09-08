package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.RecordListResponse;
import com.doacha.seesaw.model.dto.RecordRequest;
import com.doacha.seesaw.model.entity.Record;
import com.doacha.seesaw.repository.RecordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class RecordService {

    @Autowired
    RecordRepository recordRepository;

    // 글 작성
    public Record writeRecord(RecordRequest recordRequest) {
        Optional<Record> recordOptional = recordRepository.findById(recordRequest.getRecordId());

        if (recordOptional.isPresent()) {
            // 해당 record의 recordContent 등록 & 작성 시간으로 현재 시간 등록
            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            Record record = recordOptional.get();
            Record newRecord = Record.builder()
                    .recordId(record.getRecordId())
                    .recordContent(recordRequest.getRecordContent())
                    .recordWriteTime(Timestamp.valueOf(now))
                    .recordNumber(record.getRecordNumber())
                    .recordTotalCost(record.getRecordTotalCost())
                    .recordStatus(record.getRecordStatus())
                    .memberMission(record.getMemberMission())
                    .build();

            Record updatedRecord = recordRepository.save(newRecord);
            return updatedRecord;
        } else {
            //존재하지 않는 RecordId인 경우
            throw new NoContentException();
        }
    }

    // 글 수정
    public Record updateRecord(RecordRequest recordRequest) {
        Optional<Record> recordOptional = recordRepository.findById(recordRequest.getRecordId());

        if (recordOptional.isPresent()) {
            // 해당 record의 recordContent 수정
            Record record = recordOptional.get();
            Record updatedRecord = Record.builder()
                    .recordId(record.getRecordId())
                    .recordContent(recordRequest.getRecordContent())
                    .recordWriteTime(record.getRecordWriteTime())
                    .recordNumber(record.getRecordNumber())
                    .recordTotalCost(record.getRecordTotalCost())
                    .recordStatus(record.getRecordStatus())
                    .memberMission(record.getMemberMission())
                    .build();

            return recordRepository.save(updatedRecord);
        } else {
            //존재하지 않는 RecordId인 경우
            throw new NoContentException();
        }
    }

    // 글 삭제
    public void deleteRecord(Long recordId) {
        Optional<Record> recordOptional = recordRepository.findById(recordId);

        if (recordOptional.isPresent()) {
            // 해당 record의 recordContent null로 변경
            Record record = recordOptional.get();
            Record deletedRecord = Record.builder()
                    .recordId(record.getRecordId())
                    .recordContent(null)
                    .recordWriteTime(record.getRecordWriteTime())
                    .recordNumber(record.getRecordNumber())
                    .recordTotalCost(record.getRecordTotalCost())
                    .recordStatus(record.getRecordStatus())
                    .memberMission(record.getMemberMission())
                    .build();
            recordRepository.save(deletedRecord);
        } else {
            //존재하지 않는 RecordId인 경우
            throw new NoContentException();
        }
    }

    // 글 상세
    public Optional<Record> getRecordDetail(long recordId) {
        Optional<Record> record = recordRepository.findById(recordId);
        if(!record.isPresent()){
            throw new NoContentException();
        }
        return record;
    }

    // 글 목록
    public List<RecordListResponse> getRecordList(String missionId, int recordNumber) {
        List<RecordListResponse> recordListResponse = recordRepository.getRecordListResponseByMissionId(missionId, recordNumber);
        return recordListResponse;
    }

}
