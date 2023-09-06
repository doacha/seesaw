package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
//import com.doacha.seesaw.model.dto.MissionDto;
import com.doacha.seesaw.model.dto.MissionListResponse;
import com.doacha.seesaw.model.entity.Mission;
import com.doacha.seesaw.repository.MissionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class MissionService {

    @Autowired
    MissionRepository missionRepository;

    // 그룹 목록
    public Page<MissionListResponse> getMissionList(Pageable pageable) {
        Page<MissionListResponse> list = missionRepository.findByMissionIsPublic(1,pageable);
        return list;
    }

    // 그룹 생성
    public Mission createMission(Mission mission) {
        Mission newMission = missionRepository.save(mission);
        return newMission;
    }

    // 그룹 검색
    public Page<MissionListResponse> searchMission(Pageable pageable, String keyword) {
        log.info("페이지 정보 : {}", pageable);
        Page<MissionListResponse> list = missionRepository.findByMissionIsPublicAndMissionTitleLike(1,keyword, pageable);
        return list;
    }

    // 그룹 상세
    public Optional<Mission> getMissionDetail(String missionId) {
        log.info("그룹 아이디 : {}", missionId);
        Optional<Mission> mission = missionRepository.findById(missionId);
        if (!mission.isPresent()) throw new NoContentException();
        return mission;
    }

    // 그룹 인원수 +1
    public void updateMissionMemberCount(String missionId){
        Optional<Mission> mission = missionRepository.findById(missionId);
        mission.get().builder().missionMemberCount(mission.get().getMissionMemberCount()+1).build();
        missionRepository.save(mission.get());
    }


}
