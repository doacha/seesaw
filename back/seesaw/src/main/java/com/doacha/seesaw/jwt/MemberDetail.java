package com.doacha.seesaw.jwt;

import com.doacha.seesaw.model.entity.Member;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

// Spring Security에 유저 정보를 관리하기 위함
public class MemberDetail extends User {
    private final Member member;

    public MemberDetail(Member member) {
        super(member.getMemberEmail(), member.getMemberPassword(), List.of(new SimpleGrantedAuthority("USER")));
        this.member = member;
    }
}
