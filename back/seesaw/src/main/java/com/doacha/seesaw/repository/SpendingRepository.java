package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.entity.Spending;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpendingRepository extends JpaRepository<Spending, Long> {
    // 쿼리 작성해야함
    Page<Spending> findAllByUserEmailAndYearAndMonth(Pageable pageable, String userEmail, String spendingYear, String spendingMonth);
}
