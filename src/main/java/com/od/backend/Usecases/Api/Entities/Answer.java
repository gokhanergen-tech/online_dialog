package com.od.backend.Usecases.Api.Entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "answers",catalog = "user")
public class Answer {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(name = "answer",nullable = false)
    private String answer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id",referencedColumnName = "id",nullable = false)
    private Question question;

}
