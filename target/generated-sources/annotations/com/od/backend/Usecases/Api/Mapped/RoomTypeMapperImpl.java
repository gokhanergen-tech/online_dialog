package com.od.backend.Usecases.Api.Mapped;

import com.od.backend.Usecases.Api.DTO.RoomTypeDto;
import com.od.backend.Usecases.Api.Entities.RoomType;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-06-03T08:37:32+0300",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 14.0.1 (Oracle Corporation)"
)
@Component
public class RoomTypeMapperImpl implements RoomTypeMapper {

    @Override
    public RoomType mapToEntity(RoomTypeDto roomTypeDto) {
        if ( roomTypeDto == null ) {
            return null;
        }

        RoomType roomType = new RoomType();

        roomType.setRoomType( roomTypeDto.getRoomType() );

        return roomType;
    }

    @Override
    public RoomTypeDto mapToDto(RoomType roomType) {
        if ( roomType == null ) {
            return null;
        }

        RoomTypeDto roomTypeDto = new RoomTypeDto();

        roomTypeDto.setRoomType( roomType.getRoomType() );

        return roomTypeDto;
    }
}
