package com.od.backend.Security.Service;

import com.od.backend.Security.Entities.LoginRequest;
import com.od.backend.Security.Entities.LoginResponse;
import com.od.backend.Security.MapperImplements.LoginCredentialMapperImplement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginCredentialMapperImplement loginCredentialMapper;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private DaoAuthenticationProvider authenticationProvider;

    public LoginResponse loginResponse(LoginRequest loginRequest,String accessTokenKey,String refreshTokenKey ) throws Exception{
        Authentication authentication=new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());
        Authentication authUser=authenticationProvider.authenticate(authentication);

        String accessToken=jwtService.generateToken(accessTokenKey,2,authUser);
        String refreshToken=jwtService.generateToken(refreshTokenKey,10,authUser);
        return new LoginResponse(accessToken,refreshToken);
    }

    public LoginCredentialMapperImplement getLoginCredentialMapper() {
        return loginCredentialMapper;
    }
}
