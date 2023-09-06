package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.BadRequestException;
import com.doacha.seesaw.model.dto.LoginRequest;
import com.doacha.seesaw.model.dto.SignUpRequest;
import com.doacha.seesaw.model.dto.UserResponse;
import com.doacha.seesaw.model.entity.User;
import com.doacha.seesaw.repository.UserRepository;
//import jakarta.transaction.Transactional;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    // TODO: 나중에 PasswordEncoder 다시 설정 해주기
//    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse signUp(SignUpRequest signUpRequest) {
        boolean isExist = userRepository
                .existsByUserEmail(signUpRequest.getUserEmail());
        if (isExist) throw new BadRequestException("이미 존재하는 이메일입니다.");
//        String encodedPassword = passwordEncoder.encode(signUpRequest.getUserPassword());

        User user = new User(
                signUpRequest.getUserEmail(),
                signUpRequest.getUserPassword(),
//                encodedPassword,
                signUpRequest.getUserName(),
                signUpRequest.getUserNickname(),
                signUpRequest.getUserBirth(),
                signUpRequest.isUserGender(),
                false,
                0 // 처음엔 미인증(0)으로
                );

        user = userRepository.save(user);
        return UserResponse.of(user);
    }

    @Transactional(readOnly = true)
    public UserResponse login(LoginRequest loginRequest) {
        User user = userRepository
                .findByUserEmail(loginRequest.getUserEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        //일단 되는지 확인을 위한 임시 비밀번호 확인
        boolean matches = false;
        if(user.getUserPassword().equals(loginRequest.getUserPassword())) matches = true;

        //아래 코드가 passwordencoder 사용한거 이거로 바꿔야함
//        boolean matches = passwordEncoder.matches(
//                loginRequest.getUserPassword(),
//                user.getUserPassword());
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

        return UserResponse.of(user);
    }
}
