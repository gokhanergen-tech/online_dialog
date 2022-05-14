package com.od.backend.Usecases.Api.MapperImplements;

import com.od.backend.Security.Repositories.LoginCredentialsRepository;
import com.od.backend.Usecases.Api.DTO.RoomDto;
import com.od.backend.Usecases.Api.Entities.Room;
import com.od.backend.Usecases.Api.Entities.User;
import com.od.backend.Usecases.Api.Mapped.RoomMapper;
import com.od.backend.Usecases.Api.Mapped.RoomTypeMapper;
import com.od.backend.Usecases.Api.Mapped.UserMapper;
import com.od.backend.Usecases.Api.Repositories.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RoomMapperImplements implements RoomMapper {

    @Autowired
    private RoomTypeMapper roomTypeMapper;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private LoginCredentialsRepository loginCredentialsRepository;

    @Override
    public Room mapToEntity(RoomDto room) {
        if(room==null)
            throw new IllegalArgumentException("Null argument error!");
        String email= SecurityContextHolder.getContext().getAuthentication().getName();

        User user = loginCredentialsRepository.findByEmail(email).get().getUser();
        Room roomTemporary=new Room();
        roomTemporary.setTitle(room.getTitle());
        roomTemporary.setSubtitle(room.getSubtitle());
        roomTemporary.setHashedId(room.getHashedId());
        roomTemporary.setOwnerOfTheRoom(user);
        roomTemporary.setOpen(room.isOpen());
        roomTemporary.setRoomType(roomTypeMapper.mapToEntity(room.getRoomTypeDto()));
        return roomTemporary;
    }

    @Override
    public RoomDto mapToDto(Room room) {
        if(room==null)
            throw new IllegalArgumentException("Null argument error!");
        RoomDto roomDto=new RoomDto();
        roomDto.setSubtitle(room.getSubtitle());
        roomDto.setTitle(room.getTitle());
        roomDto.setHashedId(room.getHashedId());
        roomDto.setOwnerOfTheRoom(userMapper.mapToDto(room.getOwnerOfTheRoom()));
        roomDto.setRoomTypeDto(roomTypeMapper.mapToDto(room.getRoomType()));
        roomDto.setOpen(room.isOpen());
        return roomDto;
    }

    @Override
    public List<RoomDto> listMapToList(List<Room> rooms) {
        if(rooms==null)
            throw new IllegalArgumentException("Null argument error!");
        return rooms.stream().map(room -> mapToDto(room)).collect(Collectors.toList());
    }
}
