package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    boolean existsByMemberEmail(String memberEmail);

    Optional<Member> findByMemberEmail(@Param("memberEmail") String memberEmail);
}
