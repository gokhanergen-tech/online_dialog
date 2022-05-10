package com.od.backend.Usecases.Api.Services;

import com.od.backend.Usecases.Api.DTO.RoomDto;
import com.od.backend.Usecases.Api.Entities.Room;
import com.od.backend.Usecases.Api.Entities.RoomType;
import com.od.backend.Usecases.Api.MapperImplements.RoomMapperImplements;
import com.od.backend.Usecases.Api.Repositories.RoomRepository;
import com.od.backend.Usecases.Api.Repositories.RoomTypeRepository;
import com.od.backend.Usecases.Api.Validators.RoomValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Optional;


@Service
public class RoomService {

    @Autowired
    private RoomMapperImplements roomMapperImplements;

    @Autowired
    private RoomValidator roomValidator;

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Transactional
    public RoomDto createRoom(RoomDto roomDto) throws Exception{

        roomValidator.isRoomValidate(roomDto,roomRepository);

        //Get the RoomType
        Room room=roomMapperImplements.mapToEntity(roomDto);
        Optional<RoomType> roomTypeOptional=roomTypeRepository.findByRoomType(room.getRoomType().getRoomType());
        RoomType roomType=roomTypeOptional.get();

        //Set the RoomType
        room.setRoomType(roomType);
        //Save it to database
        Room addedRoom=roomRepository.save(room);
        //Convert id to Sha256 with base64
        MessageDigest messageDigest=MessageDigest.getInstance("SHA-256");
        byte[] bytes=messageDigest.digest((room.getId()+"").getBytes(StandardCharsets.UTF_8));
        room.setHashedId(Base64.getEncoder().encodeToString(bytes));
        //Update the room
        roomRepository.saveAndFlush(addedRoom);

        //Return roomDto to frontend
        return roomMapperImplements.mapToDto(room);
    }

}
