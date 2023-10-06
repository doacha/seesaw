package com.doacha.seesaw.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.sql.Timestamp;

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
            "11: 의료/건강, 12: 금융, 13: 문화/여가, 14: 여행/숙박, 15: 교육/학습, 16: 자녀/육아, 17: 반려동물, 18: 경조/선물 19: 편의점")
    private int spendingCategoryId;

//    @Column(name="spending_status")
//    @Comment("0: 바뀌지 않음, 1: 금액 수정, 2: 카테고리 수정, 3: 삭제")
//    private int spendingStatus;
//
//    @Column(name="spending_is_deleted")
//    @Comment("0: 삭제 안됨, 1: 삭제")
//    private boolean spendingIsDeleted;
//
//    @Column(name="spending_derivation")
//    @Comment("수정이나 삭제된 경우 어떤 spending_id의 수정/삭제인지")
//    private int spendingDerivation;

    @Column(name="spending_type")
    @Comment("0: 카드 내역, 1: 직접 추가")
    private int spendingType;

    @ManyToOne
    @JoinColumn(name="member_email",nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name="record_id")
    private Record record;

}
