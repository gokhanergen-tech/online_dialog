package com.od.backend.Security.Controllers;

import com.od.backend.Security.Entities.LoginCredentials;
import com.od.backend.Security.Entities.LoginRequest;
import com.od.backend.Security.Entities.LoginResponse;
import com.od.backend.Security.Service.LoginService;
import com.od.backend.Security.Service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private LoginService loginService;

    @PostMapping(value = "/register")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String,Object>> register(@RequestBody LoginCredentials loginCredentials){
        try{
            if(!userDetailsService.userExists(loginCredentials.getEmail())){
                userDetailsService.createUser(loginCredentials);
            }else{
                return new ResponseEntity<Map<String,Object>>(new HashMap(){
                    {
                        put("message","Zaten böyle bir kullanıcı bulunmaktadır!");
                    }
                },HttpStatus.BAD_REQUEST);
            }

        }catch (Exception exception){
            return new ResponseEntity<Map<String,Object>>(new HashMap(){
                {
                    put("message",exception.getMessage());
                }
            },HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<Map<String,Object>>(new HashMap(){
            {
                put("message","Kullanıcı oluşturuldu");
            }
        },HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    @CrossOrigin(origins = "*")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){
        try {
            return loginService.loginResponse(loginRequest,2);
        } catch (AuthenticationException authenticationException) {
            return new LoginResponse(authenticationException.getMessage(),"error");
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }

}
