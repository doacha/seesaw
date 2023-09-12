package com.doacha.seesaw.jwt;

import com.doacha.seesaw.exception.ForbiddenException;
import com.doacha.seesaw.model.dto.user.MemberResponse;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.redis.RedisDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtProvider {
    private final RedisDao redisDao;
    private final ObjectMapper objectMapper;

    @Value("${jwt.secret}")
    private String key;

    @Value("${jwt.live.atk}")
    private Long atkLive;

    @Value("${jwt.live.rtk}")
    private Long rtkLive;

    // JWT는 JSON 데이터를 Base64 URL-safe Encode 를 통해 인코딩하여 직렬화한 것
    @PostConstruct
    protected void init() {
        key = Base64.getEncoder().encodeToString(key.getBytes());
    }

    public TokenResponse reissueAtk(MemberResponse memberResponse) throws JsonProcessingException {
        String rtkInRedis = redisDao.getValues(memberResponse.getMemberEmail());
        if (Objects.isNull(rtkInRedis)) throw new ForbiddenException("인증 정보가 만료되었습니다.");
        Subject atkSubject = Subject.atk(
                memberResponse.getMemberEmail(),
                memberResponse.getMemberNickname());
        String atk = createToken(atkSubject, atkLive);
        return new TokenResponse(atk, null);
    }
    public TokenResponse createTokensByLogin(MemberResponse memberResponse) throws JsonProcessingException {
        Subject atkSubject = Subject.atk(
                memberResponse.getMemberEmail(),
                memberResponse.getMemberNickname());
        Subject rtkSubject = Subject.rtk(
                memberResponse.getMemberEmail(),
                memberResponse.getMemberNickname());
        String atk = createToken(atkSubject, atkLive);
        String rtk = createToken(rtkSubject, rtkLive);
        redisDao.setValues(memberResponse.getMemberEmail(), rtk, Duration.ofMillis(rtkLive));
        return new TokenResponse(atk, rtk);
    }

    public void deleteTokensByLogout(Member member){
        String atk = redisDao.getValues(member.getMemberEmail());
        if (redisDao.getValues(member.getMemberEmail()) != null) {
            redisDao.deleteValues(member.getMemberEmail()); //Token 삭제
        }
        redisDao.setValues(atk, "logout", Duration.ofMillis(atkLive));
    }

    private String createToken(Subject subject, Long tokenLive) throws JsonProcessingException {
        String subjectStr = objectMapper.writeValueAsString(subject);
        // 토큰에서 사용할 정보의 조각들을 Claim에 담음(key-value 형식으로 이루어진 한쌍의 정보를 claim 이라고 한다)
        Claims claims = Jwts.claims()
                .setSubject(subjectStr);
        Date date = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + tokenLive))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }
    // jwt의 payload에 있는 유저 정보를 Subject로 꺼낸다.
    public Subject getSubject(String atk) throws JsonProcessingException {
        String subjectStr = Jwts.parser().setSigningKey(key).parseClaimsJws(atk).getBody().getSubject();
        return objectMapper.readValue(subjectStr, Subject.class);
    }
}
