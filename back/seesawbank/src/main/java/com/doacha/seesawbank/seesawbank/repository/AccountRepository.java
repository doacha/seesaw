package com.doacha.seesawbank.seesawbank.repository;

import com.doacha.seesawbank.seesawbank.model.entity.Account;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, String>, JpaSpecificationExecutor<Account>  {
    boolean existsAccountNum(String memberEmail);
}
