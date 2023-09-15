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
public class Account {
    @Id
    @Column(name="account_num",nullable=false)
    private String accountNum;

    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName = "user_id",nullable=false)
    private User user;

    @Column(name="account_type",nullable=false)
    private int accountType;

    @Column(name="aacount_interest_rate",nullable=false)
    private int accountInterestRate;

    @Column(name="account_is_inactivate",nullable=false)
    @ColumnDefault("0")
    private boolean accountIsInactivate;

    @Column(name="account_creation_time",nullable=false)
    private Timestamp accountCreationTime;

    @Column(name="account_password",nullable=false)
    private String accountPassword;



}
