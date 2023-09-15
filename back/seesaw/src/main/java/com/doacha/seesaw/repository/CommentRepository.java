package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.dto.comment.CommentResponse;
import com.doacha.seesaw.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT new com.doacha.seesaw.model.dto.comment.CommentResponse(c.commentId, c.commentContent, " +
            "c.member.memberNickname, c.member.memberEmail, c.member.memberImgUrl, c.commentWriteTime) " +
            "FROM Comment c " +
            "WHERE c.record.recordId = :recordId " +
            "ORDER BY c.commentWriteTime ASC")
    List<CommentResponse> findCommentResponseByRecordIdOrderByCommentWriteTimeAsc(Long recordId);
}
