package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
