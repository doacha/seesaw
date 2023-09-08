package com.doacha.seesaw.model.entity;

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
public class Comment {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commentId;

    @Column(name="comment_content",nullable=false)
    private String commentContent;

    @Column(name="comment_write_time",nullable = false)
    private String commentWriteTime;

    @ManyToOne
    @JoinColumn(name="record_id",nullable = false)
    private Record record;

    @ManyToOne
    @JoinColumn(name="member_email",nullable=false)
    private Member member;

}
