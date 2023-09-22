package com.doacha.seesaw.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "spending")
public class Spending {
    @Id
    @Column(name="spending_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long spendingId;

    @Column(name="spending_title" ,nullable=false)
    private String spendingTitle;

    @Column(name="spending_cost" ,nullable=false)
    private int spendingCost;

    @Column(name="spending_date" ,nullable=false)
    private Timestamp spendingDate;

    @Column(name="spending_memo")
    private String spendingMemo;

    @Column(name = "spending_category_id", nullable = false)
    @Comment("0: 미분류, 1: 식비, 2: 카페/간식, 3: 술/유흥, 4: 생활, 5: 쇼핑, 6: 패션, 7: 뷰티/미용, 8: 교통, 9: 자동차, 10: 주거/통신" +
            "11: 의료/건강, 12: 금융, 13: 문화/여가, 14: 여행/숙박, 15: 교육/학습, 16: 자녀/육아, 17: 반려동물, 18: 경조/선물")
    private int spendingCategoryId;

    @ManyToOne
    @JoinColumn(name="member_email",nullable = false)
    private Member member;



}
