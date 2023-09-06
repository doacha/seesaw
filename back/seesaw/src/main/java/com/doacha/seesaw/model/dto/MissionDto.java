//package com.doacha.seesaw.model.dto;
//
//import com.doacha.seesaw.model.entity.Category;
//import io.swagger.v3.oas.annotations.media.Schema;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//@Schema(description = "미션 그룹 DTO")
//public class GroupDto {
//
//    @Column(name = "group_id")
//    @Schema(description = "그룹 아이디", example = "abcd1234", required = true)
//    private String groupId;
//
//    @Column(name = "group_title")
//    @Schema(description = "그룹 제목", example = "일주일동안 5만원 쓰기", required = true)
//    private String groupTitle;
//
//    @Column(name = "group_member_count", nullable = false)
//    @Schema(description = "현재 그룹 인원수", example = "2", required = true)
//    private int groupMemberCount;
//
//    @Column(name = "group_max_count", nullable = false)
//    @Schema(description = "총 모집 인원수", example = "6", required = true)
//    private int groupMaxCount;
//
//    @Column(name = "group_img_url")
//    @Schema(description = "그룹 이미지 Url", required = false)
//    private String groupImgUrl;
//
//    @Column(name = "group_purpose")
//    @Schema(description = "그룹 소개글", example = "일주일동안 5만원쓰기 같이 하실 분!!", required = true)
//    private String groupPurpose;
//
//    @Column(name = "group_min_deposit")
//    @Schema(description = "최소 예치금", example = "30000", required = true)
//    private int groupMinDeposit;
//
//    @Column(name = "group_is_public")
//    @Schema(description = "그룹 공개 여부", example = "true", required = true)
//    private boolean groupIsPublic;
//
//    @Column(name = "group_limit")
//    @Schema(description = "미션 금액", example = "50000", required = true)
//    private int groupLimit;
//
//    @Column(name = "group_period")
//    @Schema(description = "미션 횟수", example = "4", required = true)
//    private int groupPeriod;
//
//    @Column(name = "group_cycle")
//    @Schema(description = "미션 주기", example = "7", required = true)
//    private int groupCycle;
//
//    @Column(name = "group_start_date")
//    @Schema(description = "미션 시작일", example = "2023-09-11", required = true)
//    private String groupStartDate;
//
//    @Column(name = "group_creation_time")
//    @Schema(description = "그룹 생성일", example = "2023-09-05", required = false)
//    private String groupCreationTime;
//
//    @Column(name = "group_host_email")
//    @Schema(description = "그룹장 이메일", example = "doacha@seesaw.com", required = true)
//    private String groupHostEmail;
//
//    @Column(name="category_id")
//    @Schema(description = "미션 카테고리", example = "0", required = true)
//    private Long categoryId;
//}
