package com.od.backend.Security.Entities;


import com.od.backend.Usecases.Api.Entities.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "logins",schema = "auth")
@Getter
@Setter
@RequiredArgsConstructor
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //mail reqex control yapılacak
    @Column(name = "email",nullable = false)
    private String email;

    @Column(name = "password",nullable = false)
    private String password;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "pk_user_id",referencedColumnName = "id",nullable = false)
    private User user;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_authorities"
    ,joinColumns = @JoinColumn(name = "login_id")
    ,inverseJoinColumns = @JoinColumn(name = "authority_id")
    ,schema = "auth")
    private Set<Authority> authorities;



}
