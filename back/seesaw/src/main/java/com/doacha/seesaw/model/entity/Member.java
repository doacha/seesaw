package com.doacha.seesaw.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @Column(name="member_email")
    private String memberEmail;

    @Column(name="member_password")
    private String memberPassword;

    @Column(name="member_name",nullable = false)
    private String memberName;

    @Column(name="member_nickname",nullable = false)
    private String memberNickname;

    @Column(name="member_birth",nullable = false)
    private String memberBirth;

    @Column(name="member_gender")
    private boolean memberGender;

    @Column(name="member_phone_number")
    private String memberPhoneNumber;

    @Column(name="member_is_social" ,nullable = false)
    private boolean memberIsSocial; // 소셜로그인 여부

    @Column(name="member_state",nullable = false )
    private int memberState; //

    @Column(name="member_imgUrl" )
    private String memberImgUrl;

    public Member(String memberEmail, String memberPassword, String memberName, String memberNickname, String memberBirth, boolean memberGender, boolean memberIsSocial, int memberState) {
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.memberNickname = memberNickname;
        this.memberBirth = memberBirth;
        this.memberGender = memberGender;
        this.memberIsSocial = memberIsSocial;
        this.memberState = memberState;
    }
}
