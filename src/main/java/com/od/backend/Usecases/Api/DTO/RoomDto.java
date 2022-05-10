package com.od.backend.Usecases.Api.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDto {

    private String hashedId;
    private String title;
    private String subtitle;
    private UserDto ownerOfTheRoom;
    private RoomTypeDto roomTypeDto;
    private boolean open;

}
