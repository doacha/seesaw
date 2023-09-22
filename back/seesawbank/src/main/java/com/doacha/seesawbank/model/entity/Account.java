package com.doacha.seesawbank.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "account")
public class Account {
    @Id
    @Column(name="account_num", nullable = false)
    @Schema(description = "계좌 번호", example = "457899-01-100001", required = true)
    private String accountNum;

    @ManyToOne
    @JoinColumn(name="member_id",referencedColumnName = "member_id",nullable=false)
    @Schema(description = "사용자 아이디", example = "tldnjs324", required = true)
    private Member member;

    @Column(name="account_name",nullable=false)
    @Schema(description = "계좌명", example = "최애 만날 때까지 숨참고 적금", required = true)
    private String accountName;

    @Column(name="account_type",nullable=false)
    @Schema(description = "계좌 종류(0: 일반계좌, 1: 적금계좌)", example = "1", required = true)
    @ColumnDefault("1") // 만들 때는 적금 계좌만 만들어서
    private int accountType;

    @Column(name="acount_interest_rate",nullable=false)
    @Schema(description = "이자율", example = "2.0f", required = true)
    private float accountInterestRate;

    @Column(name="account_status",nullable=false)
    @Schema(description = "계좌 상태(0: 활성화, 1: 휴면, 2: 해지)", example = "0", required = true)
    @ColumnDefault("0")
    private int accountStatus;

    @Column(name="account_creation_time",nullable=false)
    @Schema(description = "계좌 생성 시간", example = "2023-09-19 16:45:29.000000", required = true)
    private Timestamp accountCreationTime;

    @Column(name="account_password",nullable=false)
    @Schema(description = "계좌 비밀번호", example = "1234", required = true)
    private String accountPassword;

    @Column(name="account_bank_name",nullable=false)
    @Schema(description = "은행 이름(번호로 소통)", example = "0", required = true)
    private int accountBankName;

    @Column(name="account_recent_balance",nullable=false)
    @Schema(description = "계좌 잔액", example = "1000000", required = true)
    private int accountRecentBalance;

}
