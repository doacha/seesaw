package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
