package com.od.backend.Usecases.Api.Entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "choices",catalog = "user")
public class Choices {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(name = "correct_choice",nullable = false,columnDefinition = "VARCHAR")
    private String correctChoice;

    @Column(name = "a_choice",columnDefinition = "VARCHAR")
    private String aChoice;

    @Column(name = "b_choice",columnDefinition = "VARCHAR")
    private String bChoice;

    @Column(name = "c_choice",columnDefinition = "VARCHAR")
    private String cChoice;

    @Column(name = "d_choice",columnDefinition = "VARCHAR")
    private String dChoice;

    @Column(name = "e_choice",columnDefinition = "VARCHAR")
    private String eChoice;

}
