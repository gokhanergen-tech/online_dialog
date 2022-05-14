package com.od.backend.Usecases.Api.Entities;

import com.od.backend.BaseEntities.Base;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "rooms",catalog = "user")
public class Room extends Base implements Comparable<Room> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "hashed_id",nullable = true)
    private String hashedId;

    @Column(name = "title",nullable = false,unique = true)
    private String title;

    @Column(name = "subtitle",nullable = false)
    private String subtitle;

    @Column(name = "is_open",nullable = false)
    private boolean open=false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by_user_id",referencedColumnName = "id",nullable = false)
    private User ownerOfTheRoom;

    @OneToOne(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinColumn(name = "room_type_id",referencedColumnName = "id",nullable = false)
    private RoomType roomType;

    @ManyToMany(fetch = FetchType.LAZY,mappedBy = "rooms")
    private Set<User> users;

    @Override
    public int compareTo(Room o) {
        if(o==null)
            return -1;
        Date createdDate=o.getCreatedDate();
        Date thisDate=this.getCreatedDate();
        return thisDate.compareTo(createdDate);
    }
}
