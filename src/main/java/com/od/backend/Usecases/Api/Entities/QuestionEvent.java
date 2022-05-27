package com.od.backend.Usecases.Api.Entities;

import com.od.backend.BaseEntities.Base;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "question_events",catalog = "user")
public class QuestionEvent extends Base {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(name = "title",nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",referencedColumnName = "id",nullable = false)
    private User user;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "questionEvent",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.MERGE,CascadeType.REMOVE},orphanRemoval = true)
    private Set<Question> questions;

    //Question Event Rooms
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinTable(name = "rooms_and_question_events",
    inverseJoinColumns = {@JoinColumn(name = "room_id")},
    joinColumns = {@JoinColumn(name = "question_event_id")})
    private Set<Room> rooms;

}
