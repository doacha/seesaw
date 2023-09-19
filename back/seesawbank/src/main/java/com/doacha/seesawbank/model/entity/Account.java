package com.doacha.seesawbank.model.entity;

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
    @Column(name="account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;

    @Column(name="account_num")
    private String accountNum;

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
