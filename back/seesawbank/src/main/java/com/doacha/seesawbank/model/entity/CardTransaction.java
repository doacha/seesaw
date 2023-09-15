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
public class CardTransaction {
    @Id
    @Column(name="card_approval_num",nullable=false)
    private String cardApprovalNum;

    @ManyToOne
    @JoinColumn(name="card_num",referencedColumnName = "card_num",nullable = false)
    private Card card;

    @Column(name="card_company",nullable = false)
    private String cardCompany;

    @Column(name="card_approval_amount",nullable = false)
    private int cardApprovalAmount;

    @Column(name="card_transaction_time",nullable = false)
    private Timestamp cardTransactionTime;

    @Column(name="card_store_name",nullable = false)
    private String cardStoreName;

    @Column(name="card_store_bus_num",nullable = false)
    private String cardStoreBusNum;

    @Column(name="card_store_category",nullable = false)
    private String cardStoreCategory;
}
