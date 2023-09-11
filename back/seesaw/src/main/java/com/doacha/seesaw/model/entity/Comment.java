package com.doacha.seesaw.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(name="comment_content",nullable=false)
    private String commentContent;

    @Column(name="comment_write_time",nullable = false)
    @ColumnDefault("CURRENT_TIMESTAMP")
    private Timestamp commentWriteTime;

    @ManyToOne
    @JoinColumn(name="record_id",nullable = false)
    private Record record;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="mission_id",referencedColumnName = "mission_id",nullable = false),
            @JoinColumn(name="member_email", referencedColumnName = "member_email",nullable=false)})
    private MemberMission memberMission;

}
