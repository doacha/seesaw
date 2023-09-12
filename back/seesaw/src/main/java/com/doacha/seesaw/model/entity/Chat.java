package com.doacha.seesaw.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Chat")
@Schema(description = "채팅")
public class Chat {

    @Id
    @Column(name = "chat_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "채팅 아이디", example = "0", required = true)
    private Long chatId;

    @Column(name = "chat_comment", nullable = false)
    @Schema(description = "채팅 내용", example = "안녕하세요", required = true)
    private String chat_comment;

    @Column(name = "chat_write_time", nullable = false)
    @Schema(description = "채팅 작성 시간", example = "2023-09-05 13:50:14", required = true)
    private Timestamp chat_write_time;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="mission_id",referencedColumnName = "mission_id",nullable = false),
            @JoinColumn(name="member_email", referencedColumnName = "member_email",nullable = false)})
    @Schema(description = "미션 아이디, 사용자 이메일", required = true)
    private MemberMission memberMission;

}
