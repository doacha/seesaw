package com.doacha.seesaw.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Spending {
    @Id
    @Column(name="spending_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int spendingId;

    @Column(name="spending_title" ,nullable=false)
    private String spendingTitle;

    @Column(name="spending_cost" ,nullable=false)
    private int spendingCost;

    @Column(name="spending_date" ,nullable=false)
    private String spendingDate;

    @Column(name="spending_memo")
    private String spendingMemo;

    @Enumerated(EnumType.STRING)
    private Category category;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="user_email",nullable = false)
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="record_id",nullable = false)
    private Record record;


}
