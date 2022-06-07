package com.od.backend.Usecases.Api.Controllers;

import com.od.backend.Security.Service.UserDetailsService;
import com.od.backend.Usecases.Api.DTO.RoomDto;
import com.od.backend.Usecases.Api.Services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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

    @PostMapping(value = "/file")
    private String aa(@RequestParam MultipartFile file, ModelMap modelMap) throws IOException {
        Path path=Files.createFile(Path.of(file.getOriginalFilename()));
        file.transferTo(path);
        return file.getOriginalFilename();
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

    @GetMapping(value = "/validate")
    public ResponseEntity<Map<String,Object>> validateRoomForUser(@RequestParam(name = "roomId") String roomId,Authentication authentication){
        Map<String,Object > response=new HashMap<>();
        try{
            Map<String,Object> result=roomService.validateRoomForUser(roomId,authentication,userDetailsService);
            return ResponseEntity.status(200).body(result);
        }catch (IllegalArgumentException | AccessDeniedException error){
            response.put("message",error.getMessage());
            return ResponseEntity.status(400).body(response);
        }catch (Exception exception){
            response.put("message",exception.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
