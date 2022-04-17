package com.od.backend.Usecases.Api.Entities;


import com.od.backend.BaseEntities.Base;
import com.od.backend.Security.Entities.LoginCredentials;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "users",catalog = "user")
@Getter
@Setter
@RequiredArgsConstructor
public class User extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name = "full_name",nullable = false)
    private String fullName;

    @Column(name = "isOwner",columnDefinition = "boolean default 'false'")
    private boolean isOwner;

    @OneToOne(mappedBy = "user",cascade = {CascadeType.ALL})
    private LoginCredentials loginCredentials;

}
