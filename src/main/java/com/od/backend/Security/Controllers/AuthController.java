package com.od.backend.Security.Controllers;

import com.od.backend.Security.DTO.LoginCredentialDto;
import com.od.backend.Security.Entities.LoginCredential;
import com.od.backend.Security.Entities.LoginRequest;
import com.od.backend.Security.Entities.LoginResponse;
import com.od.backend.Security.Service.*;
import com.od.backend.Usecases.Api.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private LoginService loginService;
    @Autowired
    private CookieService cookieService;
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Autowired
    private JWTService jwtService;

    @Value("${jwt.security.secret_key_accessToken}")
    private String accessTokenKey;
    @Value("${jwt.security.secret_key_refreshToken}")
    private String refreshTokenKey;


    @PostMapping(value = "/register")
    public ResponseEntity<Map<String,Object>> register(@RequestBody LoginCredential loginCredential){
        try{
            if(!userDetailsService.userExists(loginCredential.getEmail())){
                userDetailsService.createUser(loginCredential);
            }else{
                return new ResponseEntity<Map<String,Object>>(new HashMap(){
                    {
                        put("message","Kullanıcı oluşturulamadı!");
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
    public ResponseEntity<Map<String,Object>> login(HttpServletResponse httpServletResponse, @RequestBody LoginRequest loginRequest){
        try {
            //Login
            LoginResponse loginResponse=loginService.loginResponse(loginRequest,accessTokenKey,refreshTokenKey);

            //Get user from the database
            User user=((LoginCredential)userDetailsService.loadUserByUsername(loginRequest.getEmail())).getUser();

            //Saved the refresh token to the database
            refreshTokenService.saveRefreshToken(loginResponse.getRefreshToken(),user);

            //Added Cookies
            cookieService.addCookie(httpServletResponse,"accessToken", loginResponse.getAccessToken(),60*60*24*2);
            cookieService.addCookie(httpServletResponse,"refreshToken", loginResponse.getRefreshToken(),60*60*24*10);

            LoginCredentialDto loginCredentialDto=loginService.getLoginCredentialMapper().mapToDTO(user.getLoginCredential());
            //Finally login is successful
            return new ResponseEntity<Map<String,Object>>(new HashMap<String,Object>(){
                {
                    put("user",loginCredentialDto);
                    put("isAuth",true);
                }
            },HttpStatus.OK);
        } catch (AuthenticationException authenticationException) {
            return new ResponseEntity<Map<String,Object>>(new HashMap<String,Object>(){
                {
                    put("message","Kullanıcı adı veya şifre yanlış");
                }
            },HttpStatus.UNAUTHORIZED);
        } catch (Exception exception) {
            return new ResponseEntity<Map<String,Object>>(new HashMap<String,Object>(){
                {
                    put("message",exception.getMessage());
                }
            },HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/refresh_token")
    public ResponseEntity<Map<String,String>> refreshToken(){
       return null;
    }

    @GetMapping(value = "/auth/control")
    public ResponseEntity<Map<String,Object>> authControl(){
        Map<String,Object> jsonObject=new HashMap<>();
        try{

            String userName= SecurityContextHolder.getContext().getAuthentication().getName();

            LoginCredential loginCredential=(LoginCredential) userDetailsService.loadUserByUsername(userName);

            LoginCredentialDto loginCredentialDto=loginService.getLoginCredentialMapper().mapToDTO(loginCredential);

            jsonObject.put("isAuth",true);
            jsonObject.put("user",loginCredentialDto);

            return ResponseEntity.status(200).body(jsonObject);

        }catch (UsernameNotFoundException usernameNotFoundException){
            jsonObject.put("message","There is not such a user");
            return ResponseEntity.status(404).body(jsonObject);
        }
        catch (Exception err){
            jsonObject.put("message",err.getMessage());
            return ResponseEntity.status(500).body(jsonObject);
        }
    }
}
