package com.doacha.seesaw.config;

import com.doacha.seesaw.jwt.JwtAuthenticationFilter;
import com.doacha.seesaw.jwt.JwtProvider;
import com.doacha.seesaw.jwt.MemberDetailService;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtProvider jwtProvider;
    private final MemberDetailService memberDetailService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    // TODO: 나중에 PasswordEncoder 다시 설정 해주기
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


//    @Bean
//    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//        http.cors(cors->cors.disable()).csrf(csrf->csrf.disable())
//                .authorizeRequests(authorizeRequests -> authorizeRequests
//                        // 접속 혀용할 URL
//                        .requestMatchers("/**","/user/signup", "/user/login", "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
//                        // 나머지 요청은 인증 필요
//                        .anyRequest().authenticated()
//                )
//                .httpBasic(Customizer.withDefaults());
//
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors->cors.disable()).csrf(csrf->csrf.disable())
                .exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(customAuthenticationEntryPoint)) // invalid한 token에 대한 예외 처리
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeRequests()
                //접속 허용할 url
                .requestMatchers("/**","/user/signup", "/user/login", "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                //나머지 요청은 인증 필요
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, memberDetailService),
                        UsernamePasswordAuthenticationFilter.class); // customFilter를 UsernamePasswordAuthenticationFilter보다 앞에 설정
        return http.build();
    }

}