package com.doacha.seesaw.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "UserMission")
@Schema(description = "user-mission 연결 테이블용 entity")
public class UserMission {

    @Id
    @ManyToOne
    @JoinColumn(name = "mission_id")
    @Schema(description = "그룹 아이디", example = "abcd1234", required = true)
    private Mission mission;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_email")
    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private User user;

    @Column(name = "user_mission_deposit")
    @Schema(description = "예치금", example = "40000", required = true)
    private int userMissionDeposit;

    @Column(name = "user_mission_state")
    @Schema(description = "그룹 상태 - 0:시작전, 1: 성공, 2:실패", example = "0", required = true)
    private int userMissionState;

    @Column(name = "user_mission_tnum")
    @Schema(description = "결제 번호", required = true)
    private int userMissionTnum;

}
