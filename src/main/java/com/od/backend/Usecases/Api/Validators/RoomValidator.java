package com.od.backend.Usecases.Api.Validators;

import com.od.backend.Usecases.Api.DTO.RoomDto;
import com.od.backend.Usecases.Api.Entities.Room;
import com.od.backend.Usecases.Api.Repositories.RoomRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class RoomValidator {

    public void isTitleValidate(String title){
        if(title==null || title.trim()=="")
            throw new IllegalArgumentException("Geçersiz oda başlığı girildi!");
        if(title.trim().length()<10)
            throw new IllegalArgumentException("Başlık karakter uzunluğu 10 ve 10'dan büyük olmalı!");
    }

    public void isSubTitleValidate(String subtitle){
        if(subtitle==null || subtitle.trim()=="")
            throw new IllegalArgumentException("Geçersiz oda alt başlığı girildi!");
        if(subtitle.trim().length()<10)
            throw new IllegalArgumentException("Alt başlık karakter uzunluğu 10 ve 10'dan büyük olmalı!");
    }

    public void isRoomTypeValidate(String roomType){
        if(roomType==null || roomType.trim()==""||!List.of("OFFICE_ROOM","INTERVIEW_ROOM").contains(roomType))
            throw new IllegalArgumentException("Geçersiz oda tipi!");
    }

    public void isTheRoomExist(String title, RoomRepository roomRepository){
        Optional<Boolean> existResult=roomRepository.isRoomExist(title);
        if(!existResult.isEmpty())
           throw new IllegalStateException("Zaten böyle bir başlıkta bir oda bulunmaktadır!");
    }

    public void isRoomValidate(RoomDto roomDto,RoomRepository roomRepository){
        if(roomDto==null)
            throw new IllegalArgumentException("Gönderilen veri null olamaz!");
        isRoomTypeValidate(roomDto.getRoomTypeDto().getRoomType());
        isSubTitleValidate(roomDto.getSubtitle());
        isTitleValidate(roomDto.getTitle());
        isTheRoomExist(roomDto.getTitle(),roomRepository);

    }


}
