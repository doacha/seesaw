package com.doacha.seesawbank.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @Column(name="user_id",nullable = false)
    private String userId;

    @Column(name="user_password",nullable = false)
    private String userPassword;

    @Column(name="user_name",nullable = false)
    private String userName;

    }

