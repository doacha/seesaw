package com.doacha.seesaw.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "MemberMission")
@Schema(description = "member-mission 연결 테이블용 entity")
public class MemberMission {

    @Id
    @ManyToOne
    @JoinColumn(name = "mission_id")
    @Schema(description = "미션 아이디", example = "abcd1234", required = true)
    private Mission mission;

    @Id
    @ManyToOne
    @JoinColumn(name = "member_email")
    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private Member member;

    @Column(name = "member_mission_deposit")
    @Schema(description = "예치금", example = "40000", required = true)
    private int memberMissionDeposit;

    @Column(name = "member_mission_state")
    @ColumnDefault("0")
    @Comment("0: 시작 전, 1: 성공, 2: 실패")
    @Schema(description = "미션 상태 - 0:시작전, 1: 성공, 2:실패", example = "0", required = true)
    private int memberMissionState;

    @Column(name = "member_mission_tnum")
    @Schema(description = "결제 번호", required = true)
    private int memberMissionTnum;

}
