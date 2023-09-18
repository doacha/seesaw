package com.doacha.seesawbank.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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

    @Column(name="account_is_deposit",nullable=false)
    private boolean accountIsDeposit;

    @Column(name="account_transaction_name", nullable=false)
    private String accountTransactionName;

    @Column(name="account_transaction_num",nullable=true)
    private String accountTransactionNum;



}
