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
@Table(name = "rooms",catalog = "user")
public class Room extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "hashed_id",nullable = true)
    private String hashedId;

    @Column(name = "title",nullable = false)
    private String title;

    @Column(name = "subtitle",nullable = false)
    private String subtitle;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by_user_id",referencedColumnName = "id",nullable = false)
    private User ownerOfTheRoom;

    @OneToOne(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinColumn(name = "room_type_id",referencedColumnName = "id",nullable = false)
    private RoomType roomType;

    @ManyToMany(fetch = FetchType.LAZY,mappedBy = "rooms")
    private Set<User> users;

}
