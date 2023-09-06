package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserEmail(String userEmail);

    Optional<User> findByUserEmail(String userEmail);
}
