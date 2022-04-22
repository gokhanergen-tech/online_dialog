package com.od.backend.Security.MapperImplements;

import com.od.backend.Security.DTO.LoginCredentialDto;
import com.od.backend.Security.Entities.LoginCredential;
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
    public LoginCredential mapToEntity(LoginCredentialDto loginCredentialDto) {
        if(loginCredentialDto==null)
            throw new IllegalArgumentException();

        LoginCredential loginCredential=loginCredentialMapper.mapToEntity(loginCredentialDto);
        loginCredential.setUser(userDtoMapper.mapToEntity(loginCredentialDto.getUserDto()));

        return loginCredential;
    }

    @Override
    public LoginCredentialDto mapToDTO(LoginCredential loginCredential) {
        if(loginCredential ==null)
            throw new IllegalArgumentException();

        String email= loginCredential.getEmail();
        UserDto userDto=userDtoMapper.mapToDto(loginCredential.getUser());

        return new LoginCredentialDto(email,userDto);
    }
}
