package com.od.backend.Usecases.Api.Controllers;

import com.od.backend.Usecases.Api.DTO.RoomDto;
import com.od.backend.Usecases.Api.Services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping(value = "/rooms")
    private List<String> rooms(){
        return List.of("Hello");
    }

    @PostMapping(value = "/room")
    private ResponseEntity<Map<String,Object>> room(@RequestBody RoomDto roomDto){
        Map<String,Object> response=new HashMap<>();
        try{
            RoomDto gettedRoomDto=roomService.createRoom(roomDto);
            response.put("room",gettedRoomDto);
            return ResponseEntity.ok(response);
        }catch (IllegalArgumentException illegalArgumentException){
           response.put("message",illegalArgumentException.getMessage());
           return ResponseEntity.status(400).body(response);
        }catch (Exception exception){
           response.put("message",exception.getMessage());
           return ResponseEntity.status(500).body(response);
        }
    }

}
