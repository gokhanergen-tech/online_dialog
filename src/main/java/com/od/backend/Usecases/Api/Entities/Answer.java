package com.od.backend.Usecases.Api.Entities;

import com.od.backend.Usecases.Api.Constraints.AnswerPk;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "answers",catalog = "user")
@IdClass(AnswerPk.class)
public class Answer {

    @Column(name = "answer",nullable = false)
    private String answer;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",nullable = false,referencedColumnName = "id")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id",nullable = false,referencedColumnName = "id")
    private Room room;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id",referencedColumnName = "id",nullable = false)
    private Question question;

}
