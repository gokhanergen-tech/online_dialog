package com.od.backend.Usecases.Api.Entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "room_types",catalog = "user")
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "room_type",unique = true,nullable = false)
    private String roomType;

    public RoomType(String roomType) {
        this.roomType = roomType;
    }
}
