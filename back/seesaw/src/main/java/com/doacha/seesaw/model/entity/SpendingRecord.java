package com.doacha.seesaw.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "spending_record")
public class SpendingRecord {
    @Id
    @ManyToOne
    @JoinColumn(name = "spending_id")
    private Spending spending;

    @Id
    @ManyToOne
    @JoinColumn(name = "record_id")
    private Record record;
}
