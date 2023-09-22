package com.doacha.seesaw.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.sql.Date;
import java.sql.Timestamp;

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

    @Column(name = "mission_deposit", nullable = false)
    @Schema(description = "미션 예치금", example = "30000", required = true)
    private int missionDeposit;

    @Column(name = "mission_is_public", nullable = false)
    @Comment("0: 비공개, 1: 공개")
    @Schema(description = "미션 공개 여부", example = "true", required = true)
    private boolean missionIsPublic;

    @Column(name = "mission_target_price", nullable = false)
    @Schema(description = "미션 목표 금액", example = "50000", required = true)
    private int missionTargetPrice;

    @Column(name = "mission_penalty_price", nullable = false)
    @ColumnDefault("0")
    @Schema(description = "지금까지 모인 벌금 금액", example = "0")
    private int missionPenaltyPrice;

    @Column(name = "mission_period", nullable = false)
    @Schema(description = "미션 기간", example = "7", required = true)
    private int missionPeriod;

    @Column(name = "mission_total_cycle", nullable = false)
    @Schema(description = "미션 총 횟수", example = "4", required = true)
    private int missionTotalCycle;

    @Column(name = "mission_current_cycle", nullable = false)
    @ColumnDefault("0")
    @Schema(description = "미션 현재 횟수", example = "4")
    private int missionCurrentCycle;

    @Column(name = "mission_status", nullable = false)
    @ColumnDefault("0")
    @Comment("0: 시작 전, 1: 진행 중, 2: 종료")
    @Schema(description = "미션 상태", example = "0", required = true)
    private int missionStatus;

    @Column(name = "mission_start_date", nullable = false)
    @Schema(description = "미션 시작일", example = "2023-09-11", required = true)
    private Date missionStartDate;

    @Column(name = "mission_creation_time", nullable = false)
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Schema(description = "미션 생성일시", example = "2023-09-05 09:11:14", required = false)
    private Timestamp missionCreationTime;

    @Column(name = "mission_host_email", nullable = false)
    @Schema(description = "미션 생성자 이메일", example = "doacha@seesaw.com", required = true)
    private String missionHostEmail;

    @Column(name="mission_category_id",nullable = false)
    @Comment("0: 미분류, 1: 식비, 2: 카페/간식, 3: 술/유흥, 4: 생활, 5: 쇼핑, 6: 패션, 7: 뷰티/미용, 8: 교통, 9: 자동차, 10: 주거/통신" +
            "11: 의료/건강, 12: 금융, 13: 문화/여가, 14: 여행/숙박, 15: 교육/학습, 16: 자녀/육아, 17: 반려동물, 18: 경조/선물")
    @Schema(description = "미션 카테고리", example = "0", required = true)
    private int missionCategoryId;

}
