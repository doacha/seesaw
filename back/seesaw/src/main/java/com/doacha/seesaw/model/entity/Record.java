package com.doacha.seesaw.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Record {
    @Id
    @Column(name = "record_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long recordId;

    @Column(name = "record_content")
    private String recordContent;

    @Column(name = "record_write_time", nullable = false)
    private String recordWriteTime;

    @Column(name="record_number" ,nullable=false)
    private int recordNumber;

    @Column(name="record_total_cost" , nullable =false)
    private int recordTotalCost;

    @Column(name="record_status" ,nullable=false)
    private int recordStatus;

    @ManyToOne
    @JoinColumns({
    @JoinColumn(name="group_id",referencedColumnName = "group_id",nullable = false),
    @JoinColumn(name="user_email", referencedColumnName = "user_email",nullable = false)})
    private UserGroup userGroup;

}