package com.od.backend.Usecases.Api.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.od.backend.BaseEntities.Base;
import com.od.backend.Security.Entities.LoginCredential;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

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

    @Column(name = "is_owner",nullable = false)
    private boolean owner=false;

    @OneToOne(mappedBy = "user",cascade = {CascadeType.ALL},orphanRemoval = true)
    private LoginCredential loginCredential;

    @ManyToMany(fetch = FetchType.LAZY,cascade=CascadeType.ALL)
    @JoinTable(name = "user_rooms",
    joinColumns = {@JoinColumn(name = "user_id")},
    inverseJoinColumns = {@JoinColumn(name = "room_id")})
    private Set<Room> rooms;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "ownerOfTheRoom",orphanRemoval = true)
    private Set<Room> ownerRooms;

}
