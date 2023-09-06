package com.doacha.seesaw.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Category")
@Schema(description = "카테고리")
public class Category {

    @Id
    @Column(name = "category_id", nullable = false)
    @Schema(description = "카테고리 아이디", example = "0", required = true)
    private Long categoryId;

    @Column(name = "category_name", nullable = false)
    @Schema(description = "카테고리 이름", example = "전체", required = true)
    private String categoryName;

}
