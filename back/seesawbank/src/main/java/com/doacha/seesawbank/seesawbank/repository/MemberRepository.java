package com.doacha.seesawbank.seesawbank.repository;

import com.doacha.seesawbank.seesawbank.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    boolean existsByMemberId(String memberId);

    Optional<Member> findByMemberId(String memberId);
}
