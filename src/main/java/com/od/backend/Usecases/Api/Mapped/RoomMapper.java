package com.od.backend.Usecases.Api.Mapped;


import com.od.backend.Usecases.Api.DTO.RoomDto;
import com.od.backend.Usecases.Api.Entities.Room;

public interface RoomMapper {
    Room mapToEntity(RoomDto room);
    RoomDto mapToDto(Room room);
}
