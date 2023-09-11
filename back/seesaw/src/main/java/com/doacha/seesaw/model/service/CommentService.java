package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.dto.CommentRequest;
import com.doacha.seesaw.model.dto.CommentResponse;
import com.doacha.seesaw.model.entity.Comment;
import com.doacha.seesaw.model.entity.Member;
import com.doacha.seesaw.model.entity.Record;
import com.doacha.seesaw.repository.CommentRepository;
import com.doacha.seesaw.repository.MemberRepository;
import com.doacha.seesaw.repository.RecordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Slf4j
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    RecordRepository recordRepository;

    // 댓글 등록
    public CommentResponse registComment(CommentRequest commentRequest) {
//        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Member member = memberRepository.findById(commentRequest.getMemberEmail()).get();
        Record record = recordRepository.findById(commentRequest.getRecordId()).get();

        Comment comment = Comment.builder()
                .commentContent(commentRequest.getCommentContent())
//                .commentWriteTime(now)
                .member(member)
                .record(record)
                .build();

        Comment newComment = commentRepository.save(comment);
        CommentResponse response = CommentResponse.builder()
                .commentId(newComment.getCommentId())
                .memberNickname(member.getMemberNickname())
                .commentContent(newComment.getCommentContent())
                .commentWriteTime(newComment.getCommentWriteTime())
                .build();
        return response;
    }

    // 댓글 목록
    public List<CommentResponse> getCommentList(Long recordId) {
        return commentRepository.findCommentResponseByRecordIdOrderByCommentWriteTimeAsc(recordId);
    }

    // 댓글 수정
    public CommentResponse updateComment(CommentRequest commentRequest) {
        Member member = memberRepository.findById(commentRequest.getMemberEmail()).get();
        Record record = recordRepository.findById(commentRequest.getRecordId()).get();

        Comment comment = Comment.builder()
                .commentId(commentRequest.getCommentId())
                .commentContent(commentRequest.getCommentContent())
//                .commentWriteTime(commentRequest.getCommentWriteTime())
                .member(member)
                .record(record)
                .build();

        Comment newComment = commentRepository.save(comment);
        CommentResponse response = CommentResponse.builder()
                .commentId(newComment.getCommentId())
                .memberNickname(member.getMemberNickname())
                .commentContent(newComment.getCommentContent())
                .commentWriteTime(newComment.getCommentWriteTime())
                .build();
        return response;
    }

    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

}
