package com.doacha.seesawbank.seesawbank.model.entity;

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
@SequenceGenerator(
        name = "MEMBER_SEQ_GENERATOR",
        sequenceName = "MEMBER_SEQ", // 매핑할 데이터베이스 시퀀스 이름
        initialValue = 100001,
        allocationSize = 1)
public class Account {
    @Id
    @Column(name="account_num")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "MEMBER_SEQ_GENERATOR")
    private int accountNum;

    @ManyToOne
    @JoinColumn(name="member_id",referencedColumnName = "member_id",nullable=false)
    private Member member;

    @Column(name="account_name",nullable=false)
    private String accountName;

    @Column(name="account_type",nullable=false)
    @ColumnDefault("1") // 만들 때는 적금 계좌만 만들어서
    private int accountType;

    @Column(name="aacount_interest_rate",nullable=false)
    private float accountInterestRate;

    @Column(name="account_is_inactivate",nullable=false)
    @ColumnDefault("0")
    private boolean accountIsInactivate;

    @Column(name="account_creation_time",nullable=false)
    private Timestamp accountCreationTime;

    @Column(name="account_password",nullable=false)
    private String accountPassword;

}
