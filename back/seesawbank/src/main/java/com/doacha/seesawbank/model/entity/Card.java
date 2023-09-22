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
@Table(name = "card")
public class Card {

    @Id
    @Column(name = "card_num")
    private String cardNum;

    @ManyToOne
    @JoinColumn(name="account_num", referencedColumnName = "account_num" , nullable = false)
    private Account account;

    @ManyToOne
    @JoinColumn(name="member_id",nullable = false)
    private Member member;

    @Column(name = "card_payment_date")
    private Timestamp cardPaymentDate;

    @Column(name = "card_type")
    private String cardType;

}