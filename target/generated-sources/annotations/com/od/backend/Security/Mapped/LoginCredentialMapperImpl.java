package com.od.backend.Security.Mapped;

import com.od.backend.Security.DTO.LoginCredentialDto;
import com.od.backend.Security.Entities.LoginCredential;
import com.od.backend.Usecases.Api.DTO.UserDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-04-22T16:00:37+0300",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 14.0.1 (Oracle Corporation)"
)
@Component
public class LoginCredentialMapperImpl implements LoginCredentialMapper {

    @Override
    public LoginCredential mapToEntity(LoginCredentialDto loginCredentialDto) {
        if ( loginCredentialDto == null ) {
            return null;
        }

        LoginCredential loginCredential = new LoginCredential();

        loginCredential.setEmail( loginCredentialDto.getEmail() );

        return loginCredential;
    }

    @Override
    public LoginCredentialDto mapToDTO(LoginCredential loginCredential) {
        if ( loginCredential == null ) {
            return null;
        }

        String email = null;

        email = loginCredential.getEmail();

        UserDto userDto = null;

        LoginCredentialDto loginCredentialDto = new LoginCredentialDto( email, userDto );

        return loginCredentialDto;
    }
}
