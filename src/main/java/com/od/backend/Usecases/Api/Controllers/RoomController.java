package com.od.backend.Usecases.Api.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api")
public class RoomController {

    @GetMapping(value = "/rooms")
    public List<String> rooms(){
        return List.of("Hello");
    }

}
