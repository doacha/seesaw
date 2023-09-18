package com.doacha.seesawbank.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountTransaction {
    @Id
    @Column(name="account_deal_num",nullable=false)
    private String accountDealNum;

    @ManyToOne
    @JoinColumn(name="account_num",referencedColumnName = "account_num",nullable = false)
    private Account account;

    @Column(name="account_transaction_time", nullable = false)
    private Timestamp accountTransactionTime;

    @Column(name="account_approval_amount",nullable=false)
    private int accountApprovalAmount;

    @Column(name="amount_balance",nullable=false)
    private int accountBalance;




}
