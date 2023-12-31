package com.doacha.seesawbank.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


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
    @JoinColumn(name="account_num",nullable = false)
    private Account account;

    @ManyToOne
    @JoinColumn(name="member_id",nullable = false)
    private Member member;

    @Column(name = "card_payment_date")
    private int cardPaymentDate;

    @Column(name = "card_type")
    private String cardType;

    @Column(name = "card_company_name")
    private int cardCompanyName;

}