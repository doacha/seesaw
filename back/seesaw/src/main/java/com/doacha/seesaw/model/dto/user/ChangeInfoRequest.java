package com.doacha.seesaw.model.dto.user;

import com.doacha.seesaw.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChangeInfoRequest {

    @Schema(description = "이메일", example = "doacha@seesaw.com", required = true)
    private final String memberEmail;

    @Schema(description = "기존 비밀번호", example = "ehfldkflckck", required = false)
    private final String memberPassword;

    @Schema(description = "새 비밀번호", example = "ehfldkflckck", required = false)
    private final String memberNewPassword;

    @Schema(description = "이름", example = "도아차", required = true)
    private final String memberName;

    @Schema(description = "닉네임", example = "도아차는나야", required = true)
    private final String memberNickname;

    @Schema(description = "생년월일", example = "20050727", required = true)
    private final String memberBirth;

    @Schema(description = "성별", example = "true", required = true)
    private final boolean memberGender;

    @Schema(description = "이미지url", example = "s3://seesawawsbucket/profile/logo_black.png" , required = false)
    private final String memberImgUrl;

    @Schema(description = "전화번호", example = "01012345678", required = true)
    private final String memberPhoneNumber;

}
