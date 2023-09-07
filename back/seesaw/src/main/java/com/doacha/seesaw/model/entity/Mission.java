package com.doacha.seesaw.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.sql.Date;
import java.sql.Timestamp;

import static jakarta.persistence.FetchType.LAZY;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "mission")
@Schema(description = "미션")
public class Mission {

    @Id
    @Column(name = "mission_id", nullable = false)
    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private String missionId;

    @Column(name = "mission_title", nullable = false)
    @Schema(description = "미션 제목", example = "일주일동안 5만원 쓰기", required = true)
    private String missionTitle;

    @Column(name = "mission_member_count", nullable = false)
    @Schema(description = "현재 인원수", example = "2", required = true)
    @ColumnDefault("1")
    private int missionMemberCount;

    @Column(name = "mission_max_count", nullable = false)
    @Schema(description = "총 모집 인원수", example = "6", required = true)
    private int missionMaxCount;

    @Column(name = "mission_img_url")
    @Schema(description = "미션 이미지 Url", required = false)
    private String missionImgUrl;

    @Column(name = "mission_purpose", nullable = false)
    @Schema(description = "미션 소개글", example = "일주일동안 5만원쓰기 같이 하실 분!!", required = true)
    private String missionPurpose;

    @Column(name = "mission_min_deposit", nullable = false)
    @Schema(description = "최소 예치금", example = "30000", required = true)
    private int missionMinDeposit;

    @Column(name = "mission_is_public", nullable = false)
    @Comment("0: 비공개, 1: 공개")
    @Schema(description = "미션 공개 여부", example = "true", required = true)
    private boolean missionIsPublic;

    @Column(name = "mission_limit", nullable = false)
    @Schema(description = "미션 금액", example = "50000", required = true)
    private int missionLimit;

    @Column(name = "mission_period", nullable = false)
    @Schema(description = "미션 횟수", example = "4", required = true)
    private int missionPeriod;

    @Column(name = "mission_cycle", nullable = false)
    @Schema(description = "미션 주기", example = "7", required = true)
    private int missionCycle;

    @Column(name = "mission_start_date", nullable = false)
    @Schema(description = "미션 시작일", example = "2023-09-11", required = true)
    private Date missionStartDate;

    @Column(name = "mission_creation_time", nullable = false)
    @Schema(description = "미션 생성일시", example = "2023-09-05 09:11:14", required = false)
    private Timestamp missionCreationTime;

    @Column(name = "mission_host_email", nullable = false)
    @Schema(description = "미션 그룹장 이메일", example = "doacha@seesaw.com", required = true)
    private String missionHostEmail;

    @ManyToOne
    @JoinColumn(name="category_id",nullable = false)
    @Schema(description = "미션 카테고리", example = "0", required = true)
    private Category category;

}
