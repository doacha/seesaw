package com.doacha.seesaw.config.auth.dto;

import com.doacha.seesaw.model.entity.Member;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
public class SessionUser implements UserDetails {
    private Member user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collections = new ArrayList<>();

        collections.add(() -> {
            return "ROLE_GUEST";
        });

        return collections;
    }

    public SessionUser(Member user) {
        this.user = user;
    }

    @Override
    public String getPassword() {
        return user.getMemberPassword();
    }

    @Override
    public String getUsername() {
        return user.getMemberName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}