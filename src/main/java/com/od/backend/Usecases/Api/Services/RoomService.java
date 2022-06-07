package com.od.backend.Usecases.Api.Services;

import com.od.backend.Security.Entities.LoginCredential;
import com.od.backend.Security.Service.UserDetailsService;
import com.od.backend.Usecases.Api.DTO.RoomDto;
import com.od.backend.Usecases.Api.Entities.Room;
import com.od.backend.Usecases.Api.Entities.RoomType;
import com.od.backend.Usecases.Api.Entities.User;
import com.od.backend.Usecases.Api.MapperImplements.RoomMapperImplements;
import com.od.backend.Usecases.Api.Repositories.RoomRepository;
import com.od.backend.Usecases.Api.Repositories.RoomTypeRepository;
import com.od.backend.Usecases.Api.Util.CryptoMessage;
import com.od.backend.Usecases.Api.Validators.RoomValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;


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


    @Transactional(rollbackFor = {Exception.class})
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
        byte[] bytes= CryptoMessage.cryptoWithSha256(room.getId()+"");
        room.setHashedId(CryptoMessage.bytesToHexString(bytes));
        //Update the room
        roomRepository.saveAndFlush(addedRoom);

        //Return roomDto to frontend
        return roomMapperImplements.mapToDto(room);
    }

    public List<RoomDto> getOwnerRooms(UserDetailsService userDetailsService, String roomType, Authentication authentication) {
        if(!roomType.equals("ALL"))
         roomValidator.isRoomTypeValidate(roomType);
        String email= authentication.getName();
        LoginCredential loginCredential=(LoginCredential) userDetailsService.loadUserByUsername(email);
        List<Room> originalRooms=loginCredential
                .getUser()
                .getOwnerRooms()
                .stream()
                .filter(room -> room.
                        getRoomType().
                        getRoomType().
                        equals(roomType)||roomType.equals("ALL")).
                        collect(Collectors.toList());
        Collections.sort(originalRooms);
        List<RoomDto> rooms=roomMapperImplements.listMapToList(originalRooms);
        return rooms;
    }

    public List<RoomDto> getUserRooms(UserDetailsService userDetailsService, String roomType,Authentication authentication) {
        roomValidator.isRoomTypeValidate(roomType);
        String email= authentication.getName();
        LoginCredential loginCredential=(LoginCredential) userDetailsService.loadUserByUsername(email);
        List<Room> originalRooms=loginCredential
                .getUser()
                .getRooms()
                .stream()
                .filter(room -> room.
                        getRoomType().
                        getRoomType().
                        equals(roomType)).
                        collect(Collectors.toList());
        Collections.sort(originalRooms);
        List<RoomDto> rooms=roomMapperImplements.listMapToList(originalRooms);
        return rooms;
    }

    public Map<String,Object> validateRoomForUser(String roomId,Authentication authentication,UserDetailsService userDetailsService) throws AccessDeniedException {
        if(roomId==null)
            throw new IllegalArgumentException("Room id is null!");

        String email=authentication.getName();
        LoginCredential loginCredential=(LoginCredential) userDetailsService.loadUserByUsername(email);
        User user=loginCredential.getUser();

        List<Set<Room>> roomList=List.of(user.getOwnerRooms(),user.getRooms());
        Optional<Room> roomOptional=roomList.stream()
                   .flatMap(roomSet->roomSet.stream())
                   .filter(roomUser-> roomUser.getHashedId().equals(roomId)).findFirst();
        Room room=roomOptional.orElse(null);
        if(room==null){
            throw new AccessDeniedException("You are not in this room!");
        }

        return new HashMap<>(){
            {
                put("isOpen",room.isOpen());
                put("isInTheRoom",true);
                put("room",roomMapperImplements.mapToDto(room));
            }
        };
    }
}
