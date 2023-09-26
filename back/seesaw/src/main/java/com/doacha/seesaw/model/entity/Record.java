package com.doacha.seesaw.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Record {
    @Id
    @Column(name = "record_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    @Column(name = "record_content")
    private String recordContent;

    @Column(name = "record_write_time")
    private Timestamp recordWriteTime;

    @Column(name = "record_start_date")
    private Date recordStartDate;

    @Column(name = "record_end_date")
    private Date recordEndDate;

    @Column(name="record_total_cost" , nullable =false)
    @ColumnDefault("0")
    private int recordTotalCost;

    @Column(name="record_number" , nullable =false)
    private int recordNumber;

    @Column(name="record_status" ,nullable=false)
    @ColumnDefault("0")
    @Comment("0: 진행중 , 1: 성공, 2: 실패")
    private int recordStatus;

    @ManyToOne
    @JoinColumns({
    @JoinColumn(name="mission_id",referencedColumnName = "mission_id",nullable = false),
    @JoinColumn(name="member_email", referencedColumnName = "member_email",nullable = false)})
    private MemberMission memberMission;

    @OneToMany(mappedBy = "record")
    private List<Spending> spendingList;
}