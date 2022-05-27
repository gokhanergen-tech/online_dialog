package com.od.backend.Usecases.Api.Entities;

import com.od.backend.Usecases.Api.Constraints.MarkPk;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "user_marks_for_question_events")
@RequiredArgsConstructor
@IdClass(MarkPk.class)
public class Mark {

    @Column(name = "mark",precision = 5,scale = 2,nullable = false)
    private float mark;

    @Id
    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @Id
    @JoinColumn(name = "question_event_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private QuestionEvent questionEvent;

    @Id
    @JoinColumn(name = "room_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Room room;

}
