package com.od.backend.Usecases.Api.Mapped;

import com.od.backend.Usecases.Api.DTO.RoomTypeDto;
import com.od.backend.Usecases.Api.Entities.RoomType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomTypeMapper {
    RoomType mapToEntity(RoomTypeDto roomTypeDto);
    RoomTypeDto mapToDto(RoomType roomType);
}
