package com.od.backend.Usecases.Api.Controllers;

import com.od.backend.Security.Service.UserDetailsService;
import com.od.backend.Usecases.Api.DTO.RoomDto;
import com.od.backend.Usecases.Api.Services.RoomService;
import org.hibernate.NonUniqueObjectException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class RoomController {

    @Autowired
    private RoomService roomService;
    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping(value = "/user/rooms")
    private ResponseEntity<Map<String,Object>> userRooms(@RequestParam(name = "roomType") String roomType, Authentication authentication){
        Map<String,Object> response=new HashMap<>();
        try{
            List<RoomDto> rooms= roomService.getUserRooms(userDetailsService,roomType,authentication);
            response.put("rooms",rooms);
            return ResponseEntity.ok(response);
        }catch (IllegalArgumentException illegalArgumentException){
            response.put("message",illegalArgumentException.getMessage());
            return ResponseEntity.status(400).body(response);
        }
        catch (Exception err){
            response.put("message","Server taraflı bir hata oluştu!");
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping(value = "/owner/rooms")
    private ResponseEntity<Map<String,Object>> ownerUserRooms(@RequestParam(name = "roomType") String roomType,Authentication authentication){
        Map<String,Object> response=new HashMap<>();
        try{
          List<RoomDto> rooms= roomService.getOwnerRooms(userDetailsService,roomType,authentication);
          response.put("rooms",rooms);
          return ResponseEntity.ok(response);
        }catch (IllegalArgumentException illegalArgumentException){
           response.put("message",illegalArgumentException.getMessage());
           return ResponseEntity.status(400).body(response);
        }
        catch (Exception err){
           response.put("message","Server taraflı bir hata oluştu!");
           return ResponseEntity.status(500).body(response);
        }
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
        }catch (IllegalStateException illegalStateException) {
            response.put("message",illegalStateException.getMessage());
            return ResponseEntity.status(400).body(response);
        }
        catch (Exception exception){
           response.put("message",exception.getMessage());
           return ResponseEntity.status(500).body(response);
        }
    }

}
