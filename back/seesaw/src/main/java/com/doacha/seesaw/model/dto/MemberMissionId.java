package com.doacha.seesaw.model.dto;

import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.Mission;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "MemberMission 테이블의 PK Class")
public class MemberMissionId implements Serializable {

    private Mission mission;
    private Member member;
}

