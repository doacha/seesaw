package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
