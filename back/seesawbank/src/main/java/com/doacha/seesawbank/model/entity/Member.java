package com.doacha.seesawbank.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "member")
public class Member {
    @Id
    @Column(name="member_id",nullable = false)
    private String memberId;

    @Column(name="member_password",nullable = false)
    private String memberPassword;

    @Column(name="member_name",nullable = false)
    private String memberName;

    }

