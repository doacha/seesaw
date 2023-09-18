package com.doacha.seesawbank.repository;

import com.doacha.seesawbank.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    boolean existsByMemberId(String userId);

    Optional<Member> findByMemberId(String memberId);
}
