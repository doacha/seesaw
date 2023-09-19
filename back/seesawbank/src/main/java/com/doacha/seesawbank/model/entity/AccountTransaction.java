package com.doacha.seesawbank.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "account_transaction")
@Schema(description = "거래 내역")
public class AccountTransaction {

    @Id
    @Column(name="account_transaction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "계좌 거래 아이디", example = "1")
    private int accountTransactionId;

    @Column(name="account_deal_num",nullable=false)
    @Schema(description = "거래 번호", example = "abcd1234", required = true)
    private String accountDealNum;

    @ManyToOne
    @JoinColumn(name="account_num",referencedColumnName = "account_num",nullable = false)
    @Schema(description = "계좌 번호", example = "1234-5678-9999", required = true)
    private Account account;

    @Column(name="account_transaction_time", nullable = false)
    @Schema(description = "계좌 거래 일시", example = "2023/09/18 10:21:22", required = true)
    private Timestamp accountTransactionTime;

    @Column(name="account_approval_amount",nullable=false)
    @Schema(description = "계좌 거래 금액", example = "10000", required = true)
    private int accountApprovalAmount;

    @Column(name="amount_balance",nullable=false)
    @Schema(description = "거래 후 잔액", example = "20000", required = true)
    private int accountBalance;

    @Column(name="account_is_deposit",nullable=false)
    @Comment("0: 출금, 1: 입금")
    @Schema(description = "입출금 여부", example = "1", required = true)
    private boolean accountIsDeposit;

    @Column(name="account_transaction_name", nullable=false)
    @Schema(description = "거래자명", example = "거래자", required = true)
    private String accountTransactionName;

    @Column(name="account_transaction_num")
    @Schema(description = "거래 계좌 번호 (출금인 경우만 기입)", example = "1234-5678-8888", required = false)
    private String accountTransactionNum;

}
