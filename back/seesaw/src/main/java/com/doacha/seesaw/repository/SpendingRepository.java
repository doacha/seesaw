package com.doacha.seesaw.repository;
import com.doacha.seesaw.model.dto.spending.DailySpendingSumResponse;
import com.doacha.seesaw.model.dto.spending.MonthCategoryResponse;
import com.doacha.seesaw.model.dto.spending.MonthSpendingResponse;
import com.doacha.seesaw.model.dto.spending.MonthSpendingSumResponse;
import com.doacha.seesaw.model.entity.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SpendingRepository extends JpaRepository<Spending, Long> {
    @Query("SELECT new com.doacha.seesaw.model.dto.spending.MonthSpendingResponse(s.spendingId, s.spendingTitle,s.spendingCost,s.spendingDate,s.spendingCategoryId,s.member.memberEmail)FROM Spending s WHERE s.member.memberEmail = :memberEmail AND YEAR(s.spendingDate) = :SpendingYear AND MONTH(s.spendingDate) = :SpendingMonth "+
            "ORDER BY CASE WHEN :condition ='spendingDate' THEN s.spendingDate END DESC, "+
            "CASE WHEN :condition ='spendingCost' THEN s.spendingCost END DESC")
    List<MonthSpendingResponse> findAllByMemberEmailAndSpendingYearAndSpendingMonth(@Param("memberEmail") String memberEmail, @Param("SpendingYear") int SpendingYear, @Param("SpendingMonth") int SpendingMonth,@Param("condition") String condition);

    // 일별 지출 합계
    @Query("SELECT new com.doacha.seesaw.model.dto.spending.DailySpendingSumResponse(SUM(s.spendingCost) AS spendingCostSum, DAY(s.spendingDate) AS spendingDay, s.member.memberEmail) FROM Spending s WHERE s.member.memberEmail = :memberEmail AND YEAR(s.spendingDate) = :spendingYear AND MONTH(s.spendingDate) = :spendingMonth GROUP BY DAY(s.spendingDate), s.member.memberEmail")
    List<DailySpendingSumResponse> findDailySumByMemberEmailAndSpendingYearAndSpendingMonth(@Param("memberEmail") String memberEmail, @Param("spendingYear") int spendingYear, @Param("spendingMonth") int spendingMonth);

    // 월간 지출 합계
    // @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MonthSpendingSumResponse(SUM(s.spendingCost) AS spendingCostSum, MONTH(s.spendingDate) AS spendingMonth,s.member.memberEmail)FROM Spending s WHERE s.member.memberEmail= :memberEmail AND YEAR(s.spendingDate)=:spendingYear GROUP BY MONTH(s.spendingDate),s.member.memberEmail")
    // List<MonthSpendingSumResponse> findAllMonthSumByMemberEmailAndSpendingYear(@Param("memberEmail")String memberEmail, @Param("spendingYear") int spendingYear);

    // 해당 월지출 합계
    @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MonthSpendingSumResponse(SUM(s.spendingCost) AS spendingCostSum, MONTH(s.spendingDate) AS spendingMonth,s.member.memberEmail)FROM Spending s WHERE s.member.memberEmail= :memberEmail AND YEAR(s.spendingDate)=:spendingYear AND MONTH(s.spendingDate)=:spendingMonth GROUP BY MONTH(s.spendingDate),s.member.memberEmail")
    MonthSpendingSumResponse findMonthSumByMemberEmailAndSpendingYearAndSpendingMonth(@Param("memberEmail")String memberEmail, @Param("spendingYear") int spendingYear, @Param("spendingMonth")int spendingMonth);


    // 월간 카테고리별 합계
    @Query("SELECT NEW com.doacha.seesaw.model.dto.spending.MonthCategoryResponse(SUM(s.spendingCost) AS spendingCostSum, MONTH(s.spendingDate) AS spendingMonth,s.member.memberEmail,s.spendingCategoryId)FROM Spending s WHERE s.member.memberEmail= :memberEmail AND YEAR(s.spendingDate)=:spendingYear AND MONTH(s.spendingDate)=:spendingMonth GROUP BY s.spendingCategoryId, s.member.memberEmail")
    List<MonthCategoryResponse> findMonthSumByCategory(@Param("memberEmail")String memberEmail, @Param("spendingYear") int spendingYear, @Param("spendingMonth")int spendingMonth);


}