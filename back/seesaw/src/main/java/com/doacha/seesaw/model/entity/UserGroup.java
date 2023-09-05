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
@Table(name = "UserGroup")
@Schema(description = "user-group 연결 테이블용 entity")
public class UserGroup {

    @Id
    @ManyToOne
    @JoinColumn(name = "group_id")
    @Schema(description = "그룹 아이디", example = "abcd1234", required = true)
    private Group group;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_email")
    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private User user;

    @Column(name = "user_group_deposit")
    @Schema(description = "예치금", example = "40000", required = true)
    private int userGroupDeposit;

    @Column(name = "user_group_state")
    @Schema(description = "그룹 상태 - 0:시작전, 1: 성공, 2:실패", example = "0", required = true)
    private int userGroupState;

}
