package com.od.backend.Security.Service;

import com.od.backend.Security.Entities.RefreshToken;
import com.od.backend.Security.Repositories.RefreshTokenRepository;
import com.od.backend.Usecases.Api.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class RefreshTokenService {

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    public void saveRefreshToken(String token, User user){

        RefreshToken refreshToken=refreshTokenRepository.findByUserId(user.getId()).orElse(null);

        if(refreshToken!=null)
            refreshToken.setRefreshToken(token);
        else{
            refreshToken=new RefreshToken();
            refreshToken.setUser(user);
            refreshToken.setRefreshToken(token);
        }

        refreshTokenRepository.save(refreshToken);
    }

}
