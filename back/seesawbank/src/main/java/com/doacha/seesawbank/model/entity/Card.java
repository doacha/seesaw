package com.doacha.seesawbank.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Card {

    @Id
    @Column(name = "card_num")
    private String cardNum;

    @ManyToOne
    @JoinColumn(name="account_num",nullable = false)
    private Account accoount;

    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)
    private Member member;

    @Column(name = "card_payment_date")
    private Timestamp cardPaymentDate;

    @Column(name = "card_type")
    private String cardType;

}