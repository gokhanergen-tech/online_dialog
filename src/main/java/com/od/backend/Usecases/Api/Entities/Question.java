package com.od.backend.Usecases.Api.Entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "event_questions",catalog = "user")
public class Question {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(nullable = false,name = "question",columnDefinition = "VARCHAR")
    private String question;

    @Column(nullable = true,name = "content_text",columnDefinition = "VARCHAR")
    private String contentText;

    @Column(nullable = true,name = "image",columnDefinition = "VARCHAR")
    private String image;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_event_id",nullable = false,referencedColumnName = "id")
    private QuestionEvent questionEvent;

    @OneToOne(orphanRemoval = true,cascade = CascadeType.ALL)
    @JoinColumn(name = "choices_id",referencedColumnName = "id",nullable = false)
    private Choices choices;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "question",cascade = {CascadeType.REMOVE,CascadeType.PERSIST,CascadeType.MERGE},orphanRemoval = true)
    private Set<Answer> answers;
}
