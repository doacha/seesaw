package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.spending.GetCardTransactionDto;
import com.doacha.seesaw.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    boolean existsByMemberEmail(String memberEmail);

    boolean existsByMemberNickname(String memberNickname);

    Optional<Member> findByMemberEmail(@Param("memberEmail") String memberEmail);

    @Query("SELECT new com.doacha.seesaw.model.dto.spending.GetCardTransactionDto( " +
            "m.memberEmail, " +
            "m.memberBankId, " +
            "(SELECT MAX(s.spendingDate) FROM Spending s WHERE s.member.memberEmail = m.memberEmail AND s.spendingType=0)) " +
            "FROM Member m " +
            "WHERE m.memberEmail = :memberEmail")
    GetCardTransactionDto findGetCardTransactionDtoByMemberEmail(@Param("memberEmail") String memberEmail);
}
