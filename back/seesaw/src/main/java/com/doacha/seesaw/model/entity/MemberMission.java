package com.doacha.seesaw.model.entity;

import com.doacha.seesaw.model.dto.MemberMissionId;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "MemberMission")
@IdClass(MemberMissionId.class)
@Schema(description = "member-mission 연결 테이블용 entity")
public class MemberMission implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private Mission mission;

    @Id
    @ManyToOne
    @JoinColumn(name = "member_email", nullable = false)
    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private Member member;

    @Column(name = "member_mission_refund", nullable = false)
    @Schema(description = "미션 환급금", example = "40000", required = true)
    private int memberMissionRefund;

    @Column(name = "member_mission_status", nullable = false)
    @ColumnDefault("0")
    @Comment("0: 시작 전, 1: 진행 중, 2: 성공, 3: 실패")
    @Schema(description = "미션 상태 - 0: 시작 전, 1: 진행 중, 2: 성공, 3: 실패", example = "0", required = true)
    private int memberMissionStatus;

    @Column(name = "member_mission_saving_money", nullable = false)
    @Schema(description = "적금 금액 (0원이면 적금 연동 안한 것)", required = true)
    private int memberMissionSavingMoney;


    @Column(name = "member_mission_is_saving", nullable = false)
    @Schema(description = "적금 넣는 날인지 여부", required = true)
    private Boolean memberMissionIsSaving;
}
