package com.doacha.seesaw.model.entity;

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
public class Member {
    @Id
    @Column(name="member_email",nullable = false)
    private String memberEmail;

    @Column(name="member_password",nullable = false)
    private String memberPassword;

    @Column(name="member_name",nullable = false)
    private String memberName;

    @Column(name="member_nickname",nullable = false)
    private String memberNickname;

    @Column(name="member_birth",nullable = false)
    private String memberBirth;

    @Column(name="member_gender")
    @Comment("0: 남, 1: 여")
    private boolean memberGender;

    @Column(name="member_phone_number")
    private String memberPhoneNumber;

    @Column(name="member_is_social" ,nullable = false)
    @Comment("0: 로컬 로그인, 1: 소셜 로그인")
    private boolean memberIsSocial; // 소셜로그인 여부

    @Column(name="member_state",nullable = false)
    @Comment("0: 가입, 1: 탈퇴")
    private boolean memberIsWithdrawal;

    @Column(name="member_imgUrl")
    private String memberImgUrl;

    @Column(name="member_account")
    private String memberAccount;

    @Column(name="member_saving_account")
    private String memberSavingAccount;

    public Member(String memberEmail, String memberPassword, String memberName, String memberNickname, String memberBirth, boolean memberGender, boolean memberIsSocial, int memberState) {
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.memberNickname = memberNickname;
        this.memberBirth = memberBirth;
        this.memberGender = memberGender;
        this.memberIsSocial = memberIsSocial;
        this.memberIsWithdrawal = memberIsWithdrawal;
    }
}
