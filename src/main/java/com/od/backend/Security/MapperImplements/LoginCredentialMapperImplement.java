package com.od.backend.Security.MapperImplements;

import com.od.backend.Security.DTO.LoginCredentialDto;
import com.od.backend.Security.Entities.LoginCredentials;
import com.od.backend.Security.Mapped.LoginCredentialMapper;
import com.od.backend.Usecases.Api.DTO.UserDto;
import com.od.backend.Usecases.Api.Mapped.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LoginCredentialMapperImplement implements LoginCredentialMapper {

    @Autowired
    private UserMapper userDtoMapper;
    @Autowired
    private LoginCredentialMapper loginCredentialMapper;


    @Override
    public LoginCredentials mapToEntity(LoginCredentialDto loginCredentialDto) {
        if(loginCredentialDto==null)
            throw new IllegalArgumentException();

        return loginCredentialMapper.mapToEntity(loginCredentialDto);
    }

    @Override
    public LoginCredentialDto mapToDTO(LoginCredentials loginCredentials) {
        if(loginCredentials==null)
            throw new IllegalArgumentException();

        String email=loginCredentials.getEmail();
        UserDto userDto=userDtoMapper.mapToDTO(loginCredentials.getUser());
        return new LoginCredentialDto(email,userDto);
    }
}
