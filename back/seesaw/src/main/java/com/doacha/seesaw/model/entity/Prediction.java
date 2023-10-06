package com.doacha.seesaw.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prediction {
    @Id
    @OneToOne
    @JoinColumn(name = "member_email", nullable = false)
    @Schema(description = "사용자 이메일", example = "doacha@seesaw.com", required = true)
    private Member member;

    @Column(name="prediction_date",nullable = false)
    private Timestamp predictionDate;

    @Column(name = "prediction_unclassified", nullable = false)
    private int predictionUnclassified;

    @Column(name = "prediction_eat_out", nullable = false)
    private int predictionEatOut;

    @Column(name = "prediction_cafe_snack", nullable = false)
    private int predictionCafeSnack;

    @Column(name = "prediction_entertainment", nullable = false)
    private int predictionEntertainment;

    @Column(name = "prediction_lives", nullable = false)
    private int predictionLives;

    @Column(name = "prediction_shopping", nullable = false)
    private int predictionShopping;

    @Column(name = "prediction_fashion", nullable = false)
    private int predictionFashion;

    @Column(name = "prediction_beauty", nullable = false)
    private int predictionBeauty;

    @Column(name = "prediction_transportation", nullable = false)
    private int predictionTransportation;

    @Column(name = "prediction_car", nullable = false)
    private int predictionCar;

    @Column(name = "prediction_medical_health", nullable = false)
    private int predictionMedicalHealth;

    @Column(name = "prediction_finance", nullable = false)
    private int predictionFinance;

    @Column(name = "prediction_culture", nullable = false)
    private int predictionCulture;

    @Column(name = "prediction_travel", nullable = false)
    private int predictionTravel;

    @Column(name = "prediction_education", nullable = false)
    private int predictionEducation;

    @Column(name = "prediction_children", nullable = false)
    private int predictionChildren;

    @Column(name = "prediction_pet", nullable = false)
    private int predictionPet;

    @Column(name = "prediction_gift", nullable = false)
    private int predictionGift;

    @Column(name="prediction_convenience",nullable = false)
    private int predictionConvenience;






}
