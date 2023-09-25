package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.mission.GetMyMissionDataRequest;
import com.doacha.seesaw.model.dto.record.*;
import com.doacha.seesaw.model.entity.Record;
import com.doacha.seesaw.repository.MissionRepository;
import com.doacha.seesaw.repository.RecordRepository;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Slf4j
public class RecordService {

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    MissionRepository missionRepository;

    // 글 작성
    public RecordResponse writeRecord(RecordRequest recordRequest) {
        Optional<Record> recordOptional = recordRepository.findById(recordRequest.getRecordId());

        if (recordOptional.isPresent()) {
//             해당 record의 recordContent 등록 & 작성 시간으로 현재 시간 등록
            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            Record record = recordOptional.get();
            Record newRecord = Record.builder()
                    .recordId(record.getRecordId())
                    .recordContent(recordRequest.getRecordContent())
                    .recordWriteTime(Timestamp.valueOf(now))
                    .recordTotalCost(record.getRecordTotalCost())
                    .recordNumber(record.getRecordNumber())
                    .recordStatus(record.getRecordStatus())
                    .memberMission(record.getMemberMission())
                    .build();

            recordRepository.save(newRecord);
            RecordResponse recordResponse = recordRepository.findRecordResponseById(record.getRecordId());
            return recordResponse;
        } else {
            //존재하지 않는 RecordId인 경우
            throw new NoContentException();
        }
    }

    // 글 수정
    public RecordResponse updateRecord(RecordRequest recordRequest) {
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

            recordRepository.save(updatedRecord);
            RecordResponse recordResponse = recordRepository.findRecordResponseById(record.getRecordId());
            return recordResponse;
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
    public RecordResponse getRecordDetail(long recordId) {
        if(!recordRepository.existsById(recordId)){
            throw new NoContentException();
        }
        RecordResponse recordResponse = recordRepository.findRecordResponseById(recordId);
        return recordResponse;
    }

    // 글 목록
    public List<RecordListResponse> getRecordList(String missionId, int recordNumber) {
        List<RecordListResponse> recordListResponse = recordRepository.getRecordListResponseByMissionId(missionId, recordNumber);
        return recordListResponse;
    }

    // 과거 글 목록
    public List<List<MemberHistory>> getRecordHistoryResponse(String missionId) {
        int currentCycle = missionRepository.findById(missionId).get().getMissionCurrentCycle();
        List<MemberHistory> memberHistoryList = recordRepository.getMemberHistoryByMissionId(missionId, currentCycle);

        Collections.sort(memberHistoryList, Comparator.comparingInt(MemberHistory::getRecordNumber));

        // recordNumber가 같은 객체들을 같은 그룹으로 묶기
        List<List<MemberHistory>> groupedMemberHistory = new ArrayList<>();
        List<MemberHistory> currentGroup = new ArrayList<>();

        for (MemberHistory memberHistory : memberHistoryList) {
            if (currentGroup.isEmpty() || currentGroup.get(0).getRecordNumber() == memberHistory.getRecordNumber()) {
                currentGroup.add(memberHistory);
            } else {
                groupedMemberHistory.add(currentGroup);
                currentGroup = new ArrayList<>();
                currentGroup.add(memberHistory);
            }
        }

        // 마지막 그룹 추가
        if (!currentGroup.isEmpty()) {
            groupedMemberHistory.add(currentGroup);
        }

        return groupedMemberHistory;
    }

    // 회차별 절약 금액
    public List<Integer> getSavingMoneyList(GetMyMissionDataRequest getMyMissionDataRequest) {
        int targetPrice = missionRepository.findById(getMyMissionDataRequest.getMissionId()).get().getMissionTargetPrice();
        List<Integer> savingList = recordRepository.findRecordTotalCostByMissionIdAndMemberEmail(getMyMissionDataRequest.getMissionId(), getMyMissionDataRequest.getMemberEmail());
        for(int i=0; i<savingList.size(); i++){
            savingList.set(i, targetPrice - savingList.get(i));
        }
        return savingList;
    }
}
