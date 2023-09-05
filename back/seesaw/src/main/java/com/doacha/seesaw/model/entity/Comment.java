package com.doacha.seesaw.model.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

public class Comment {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int commentId;

    @Column(name="comment_content",nullable=false)
    private String commentContent;

    @Column(name="comment_write_time",nullable = false)
    private Timestamp commentWriteTime;

    @ManyToOne
    @JoinColumn(name="record_id",nullable = false)
    private Record record;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="group_id",referencedColumnName = "group_id",nullable = false),
            @JoinColumn(name="user_email", referencedColumnName = "user_email",nullable=false)})
    private UserGroup userGroup;

}
