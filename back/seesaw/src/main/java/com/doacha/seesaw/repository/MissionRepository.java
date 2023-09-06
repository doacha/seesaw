package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.MissionListResponse;
import com.doacha.seesaw.model.entity.Mission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MissionRepository extends JpaRepository<Mission, String> { //JpaRepository<Entity클래스, PK타입>
//    Page<MissionListResponse> findByMissionIsPublicOrderByMissionCreationTimeDesc(int groupIsPublic, Pageable pageable);
//    Page<MissionListResponse> findByMissionIsPublicAndMissionTitleLikeOrderByMissionCreationTimeDesc(int groupIsPublic, String Keyword, Pageable pageable);

    // group_id, group_title, group_member_count, group_max_count, group_img_url, group_min_deposit만 가져와야함
    Page<MissionListResponse> findByMissionIsPublic(int groupIsPublic, Pageable pageable);
    Page<MissionListResponse> findByMissionIsPublicAndMissionTitleLike(int groupIsPublic, String Keyword, Pageable pageable);

}
