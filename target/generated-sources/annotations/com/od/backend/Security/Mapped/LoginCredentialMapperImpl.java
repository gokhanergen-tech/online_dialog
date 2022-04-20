package com.od.backend.Security.Mapped;

import com.od.backend.Security.DTO.LoginCredentialDto;
import com.od.backend.Security.Entities.LoginCredentials;
import com.od.backend.Usecases.Api.DTO.UserDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-04-20T17:01:03+0300",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 14.0.1 (Oracle Corporation)"
)
@Component
public class LoginCredentialMapperImpl implements LoginCredentialMapper {

    @Override
    public LoginCredentials mapToEntity(LoginCredentialDto loginCredentialDto) {
        if ( loginCredentialDto == null ) {
            return null;
        }

        LoginCredentials loginCredentials = new LoginCredentials();

        loginCredentials.setEmail( loginCredentialDto.getEmail() );

        return loginCredentials;
    }

    @Override
    public LoginCredentialDto mapToDTO(LoginCredentials loginCredentials) {
        if ( loginCredentials == null ) {
            return null;
        }

        String email = null;

        email = loginCredentials.getEmail();

        UserDto userDto = null;

        LoginCredentialDto loginCredentialDto = new LoginCredentialDto( email, userDto );

        return loginCredentialDto;
    }
}
