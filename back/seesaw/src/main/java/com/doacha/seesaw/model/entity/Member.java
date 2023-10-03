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

    @Column(name="member_password")
    private String memberPassword;

    @Column(name="member_name",nullable = false)
    private String memberName;

    @Column(name="member_nickname")
    private String memberNickname;

    @Column(name="member_birth")
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
    @Comment("0: 가입 미인증, 1: 가입 인증, 2: 탈퇴, 3: 휴면")
    private int memberState;

    @Column(name="member_imgUrl")
    private String memberImgUrl;

    @Column(name="member_refresh_token")
    private String memberRefreshToken;

    @Column(name="member_saving_account")
    private String memberSavingAccount;

    @Column(name="member_main_account")
    private String memberMainAccount;

    @Column(name="member_bank_id")
    private String memberBankId;

    @Column(name="member_auth_key")
    private String memberAuthKey;

    public Member(String memberEmail, String memberPassword, String memberName, String memberNickname, String memberBirth, boolean memberGender, boolean memberIsSocial, int memberState, String memberAuthKey) {
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.memberNickname = memberNickname;
        this.memberBirth = memberBirth;
        this.memberGender = memberGender;
        this.memberIsSocial = memberIsSocial;
        this.memberState = memberState;
        this.memberAuthKey = memberAuthKey;
    }
}
