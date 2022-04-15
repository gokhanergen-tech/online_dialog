package com.od.backend.Security.Entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "authorities",schema = "auth")
@Getter
@Setter
@RequiredArgsConstructor
public class Authority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "authority",nullable = false)
    private String authority;

}
