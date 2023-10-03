package com.doacha.seesaw.config.auth.dto;

import com.doacha.seesaw.model.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String provider;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .provider("Google")
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public Member toEntity() {
        return Member.builder()
                .memberEmail(email)
                .memberPassword(null)
                .memberBirth(null)
                .memberName(name)
                .memberGender(false)
                .memberNickname(null)
                .memberImgUrl(null)
                .memberPhoneNumber(null)
                .memberSavingAccount(null)
                .memberMainAccount(null)
                .memberBankId(null)
                .memberAuthKey(null)
                .memberIsSocial(true)
                .memberState(1)
                .memberRefreshToken(null)
                .build();

    }
}