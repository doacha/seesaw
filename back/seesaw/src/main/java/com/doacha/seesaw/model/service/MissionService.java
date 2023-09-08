package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.dto.CreateMissionRequest;
import com.doacha.seesaw.model.dto.MissionListResponse;
import com.doacha.seesaw.model.entity.Category;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.repository.CategoryRepository;
import com.doacha.seesaw.repository.MissionRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

@Service
@Slf4j
public class MissionService {

    @Autowired
    MissionRepository missionRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public Page<MissionListResponse> getMissionList(Pageable pageable) {
        Page<MissionListResponse> list = missionRepository.findAllByMissionIsPublic(pageable);
        return list;
    }

    // 미션 생성
    public Mission createMission(CreateMissionRequest mission) {

        Category category = categoryRepository.findById(mission.getCategoryId()).get();
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Mission createdMission = Mission.builder()
                .missionId(createRandomId())
                .missionTitle(mission.getMissionTitle())
                .missionMemberCount(mission.getMissionMemberCount())
                .missionMaxCount(mission.getMissionMaxCount())
                .missionImgUrl(mission.getMissionImgUrl())
                .missionPurpose(mission.getMissionPurpose())
                .missionMinDeposit(mission.getMissionMinDeposit())
                .missionIsPublic(mission.isMissionIsPublic())
                .missionLimit(mission.getMissionLimit())
                .missionPeriod(mission.getMissionPeriod())
                .missionCycle(mission.getMissionCycle())
                .missionStartDate(mission.getMissionStartDate())
                .missionCreationTime(Timestamp.valueOf(now))
                .missionHostEmail(mission.getMissionHostEmail())
                .category(category)
                .build();

        return missionRepository.save(createdMission);
    }

    // 미션 아이디 랜덤 생성
    private String createRandomId() {
        String randomStr = RandomStringUtils.random(10, true, true);
        // 동일한 아이디가 존재하면 아이디 다시 생성
        while(missionRepository.existsById(randomStr)){
            randomStr = RandomStringUtils.random(10, true, true);
        }

        return randomStr;
    }

    // 미션 검색
    public Page<MissionListResponse> searchMission(Pageable pageable, String keyword) {
        log.info("페이지 정보 : {}", pageable);
        Page<MissionListResponse> list = missionRepository.findAllByMissionIsPublicAndMissionTitleLike(keyword, pageable);
        return list;
    }

    // 미션 상세
    public Optional<Mission> getMissionDetail(String missionId) {
        log.info("미션 아이디 : {}", missionId);
        Optional<Mission> mission = missionRepository.findById(missionId);
        if (!mission.isPresent()) throw new NoContentException();
        return mission;
    }

    // 미션 인원수 변경
    public void updateMissionMemberCount(String missionId, int cnt){
        Optional<Mission> mission = missionRepository.findById(missionId);
        Mission updatedMission = Mission.builder()
                .missionId(missionId)
                .missionTitle(mission.get().getMissionTitle())
                .missionMemberCount(mission.get().getMissionMemberCount() + cnt)
                .missionMaxCount(mission.get().getMissionMaxCount())
                .missionImgUrl(mission.get().getMissionImgUrl())
                .missionPurpose(mission.get().getMissionPurpose())
                .missionMinDeposit(mission.get().getMissionMinDeposit())
                .missionIsPublic(mission.get().isMissionIsPublic())
                .missionLimit(mission.get().getMissionLimit())
                .missionPeriod(mission.get().getMissionPeriod())
                .missionCycle(mission.get().getMissionCycle())
                .missionStartDate(mission.get().getMissionStartDate())
                .missionCreationTime(mission.get().getMissionCreationTime())
                .missionHostEmail(mission.get().getMissionHostEmail())
                .category(mission.get().getCategory())
                .build();

        missionRepository.save(updatedMission);
    }

}
