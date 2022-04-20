package com.od.backend.Security.Mapped;

import com.od.backend.Security.DTO.LoginCredentialDto;
import com.od.backend.Security.Entities.LoginCredentials;
import com.od.backend.Usecases.Api.DTO.UserDto;
import com.od.backend.Usecases.Api.Mapped.UserMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginCredentialMapper {
    LoginCredentials mapToEntity(LoginCredentialDto loginCredentialDto);
    LoginCredentialDto mapToDTO(LoginCredentials loginCredentials);
}
