package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository  extends JpaRepository<Account, String> {
}
