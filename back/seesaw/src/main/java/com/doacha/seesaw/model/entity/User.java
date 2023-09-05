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
public class User {
    @Id
    @Column(name="user_email")
    private String userEmail;

    @Column(name="user_password")
    private String userPassword;

    @Column(name="user_name",nullable = false)
    private String userName;

    @Column(name="user_nickname",nullable = false)
    private String userNickname;

    @Column(name="user_birth",nullable = false)
    private String userBirth;

    @Column(name="user_gender")
    private boolean userGender;

    @Column(name="user_phone_number")
    private String userPhoneNumber;

    @Column(name="user_is_social" ,nullable = false)
    private boolean userIsSocial;

    @Column(name="user_state",nullable = false )
    private int userState;

    @Column(name="userImgUrl" )
    private String userImgUrl;




}
