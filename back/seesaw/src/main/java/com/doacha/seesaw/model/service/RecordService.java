package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.mission.GetMyMissionDataRequest;
import com.doacha.seesaw.model.dto.record.*;
import com.doacha.seesaw.model.entity.MemberMission;
import com.doacha.seesaw.model.entity.Record;
import com.doacha.seesaw.repository.MemberMissionRepository;
import com.doacha.seesaw.repository.MissionRepository;
import com.doacha.seesaw.repository.RecordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
    MemberMissionRepository memberMissionRepository;

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
            throw new NoContentException(recordRequest.getRecordId()+"에 해당하는 레코드 없음");
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
            throw new NoContentException(recordRequest.getRecordId()+"에 해당하는 레코드 없음");
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
            throw new NoContentException(recordId+"에 해당하는 레코드 없음");
        }
    }

    // 글 상세
    public RecordResponse getRecordDetail(long recordId) {
        if(!recordRepository.existsById(recordId)){
            throw new NoContentException(recordId+"에 해당하는 레코드 없음");
        }
        RecordResponse recordResponse = recordRepository.findRecordResponseById(recordId);
        return recordResponse;
    }

    // 글 목록
    public List<RecordListResponse> getRecordList(String missionId, int recordNumber) {
        List<RecordListResponse> recordListResponse = recordRepository.getRecordListResponseByMissionId(missionId, recordNumber);
        return recordListResponse;
    }

    // 미션 상세 - 그룹 현황 - 과거 레코드 목록
    public List<List<MemberHistory>> getRecordHistoryResponse(String missionId, int pageNumber) {
        int currentCycle = missionRepository.findById(missionId).get().getMissionCurrentCycle(); // 현재 회차

        List<MemberHistory> memberHistoryList = recordRepository.getMemberHistoryByMissionId(missionId, currentCycle);

        Collections.sort(memberHistoryList, Comparator.comparingInt(MemberHistory::getRecordNumber));

        // recordNumber가 같은 객체들을 같은 그룹으로 묶기
        Map<Integer, List<MemberHistory>> recordNumberGroups = new HashMap<>();

        for (MemberHistory memberHistory : memberHistoryList) {
            int recordNumber = memberHistory.getRecordNumber();

            // 해당 recordNumber 그룹이 없으면 새로 생성
            recordNumberGroups.putIfAbsent(recordNumber, new ArrayList<>());

            // 해당 그룹에 추가
            List<MemberHistory> group = recordNumberGroups.get(recordNumber);
            group.add(memberHistory);
        }

        List<List<MemberHistory>> groupedMemberHistory = new ArrayList<>();
        for (List<MemberHistory> group : recordNumberGroups.values()) {
            group.sort(Comparator.comparingDouble(MemberHistory::getRecordTotalCost));
            groupedMemberHistory.add(group);
        }

        // 회차 기준 내림차순 정렬
        groupedMemberHistory.sort((group1, group2) -> {
            int recordNumber1 = group1.get(0).getRecordNumber();
            int recordNumber2 = group2.get(0).getRecordNumber();
            return Integer.compare(recordNumber2, recordNumber1);
        });

        // pageNumber에 따라 해당 페이지의 결과 반환
        int pageSize = 5;
        int startIndex = pageNumber * pageSize;
        int endIndex = Math.min((pageNumber + 1) * pageSize, groupedMemberHistory.size());

        if (startIndex >= endIndex) {
            return Collections.emptyList(); // 페이지에 결과가 없는 경우 빈 리스트 반환
        }

        // startIndex부터 endIndex까지의 결과를 모아서 반환
        return groupedMemberHistory.subList(startIndex, endIndex);
    }

    // 미션 상세 - 나의 현황 - 회차별 절약 금액
    public List<Integer> getSavingMoneyList(GetMyMissionDataRequest getMyMissionDataRequest) {
        int targetPrice = missionRepository.findById(getMyMissionDataRequest.getMissionId()).get().getMissionTargetPrice();
        List<Integer> savingList = recordRepository.findRecordTotalCostByMissionIdAndMemberEmail(getMyMissionDataRequest.getMissionId(), getMyMissionDataRequest.getMemberEmail());
        for(int i=0; i<savingList.size(); i++){
            savingList.set(i, targetPrice - savingList.get(i));
        }
        return savingList;
    }


    // 미션 상세 - 나의 현황 - 회차별 소비 내역 및 미션 성공 여부
    public List<List<Object>> getSpendingList(GetSpendingListRequest getSpendingListRequest) {
        List<Object[]> list = recordRepository.findRecordAndSpendingByMissionIdAndMemberEmail(getSpendingListRequest.getMissionId(), getSpendingListRequest.getMemberEmail());

        Map<Integer, List<Object>> recordGroupMap = new HashMap<>();

        for (Object[] result : list) {
            int recordNumber = (int) result[0];
            Date recordStartDate = (Date) result[1];
            Date recordEndDate = (Date) result[2];
            int recordStatus = (int) result[3];
            String spendingTitle = (String) result[4];
            int spendingCost = (int) result[5];

            // 레코드를 고유 식별자로 사용하여 그룹화
            int recordKey = recordNumber;

            // 그룹 맵에 결과 추가
            if (!recordGroupMap.containsKey(recordKey)) {
                recordGroupMap.put(recordKey, new ArrayList<>());
                recordGroupMap.get(recordKey).add(recordNumber);
                recordGroupMap.get(recordKey).add(recordStartDate);
                recordGroupMap.get(recordKey).add(recordEndDate);
                recordGroupMap.get(recordKey).add(recordStatus);
            }

            // spending 데이터를 그룹의 리스트에 추가
            List<Object> spendingData = new ArrayList<>();
            spendingData.add(spendingTitle);
            spendingData.add(spendingCost);

            recordGroupMap.get(recordKey).add(spendingData);
        }

        // 그룹화된 결과를 리스트로 변환
        List<List<Object>> response = new ArrayList<>(recordGroupMap.values());

        // recordNumber를 기준으로 내림차순으로 정렬
        Collections.sort(response, Comparator.comparing(o -> (int) o.get(0), Collections.reverseOrder()));

        // pageNumber에 따라 해당 페이지의 결과 반환
        int pageSize = 5;
        int pageNumber = getSpendingListRequest.getPageNumber();
        int startIndex = pageNumber * pageSize;
        int endIndex = Math.min((pageNumber + 1) * pageSize, response.size());

        if (startIndex >= endIndex) {
            return Collections.emptyList(); // 페이지에 결과가 없는 경우 빈 리스트 반환
        }

        // startIndex부터 endIndex까지의 결과를 모아서 반환
        return response.subList(startIndex, endIndex);
    }

    // 완료 미션 레코드 상세 리스트
    public List<EndRecordListResponse> getEndRecordList(EndRecordListRequest endRecordListRequest){
        MemberMission memberMission = memberMissionRepository.findByMissionIdAndMemberEmail(endRecordListRequest.getMissionId(), endRecordListRequest.getMemberEmail());
        List<Record> recordList = recordRepository.findRecordByMemberMissionOrderByRecordStartDateDesc(memberMission);
        List<EndRecordListResponse> endRecordListResponseList = new ArrayList<>();
        for(Record record : recordList){
            endRecordListResponseList.add(new EndRecordListResponse(
                    record.getRecordId(),
                    record.getRecordNumber(),
                    record.getRecordTotalCost(),
                    record.getRecordStartDate(),
                    record.getRecordEndDate(),
                    record.getRecordContent(),
                    record.getRecordStatus()
            ));
        }
        return endRecordListResponseList;
    }
}
