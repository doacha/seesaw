package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.entity.Category;
import com.doacha.seesaw.model.entity.Spending;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
