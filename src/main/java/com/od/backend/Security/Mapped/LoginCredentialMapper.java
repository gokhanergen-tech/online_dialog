package com.od.backend.Security.Mapped;

import com.od.backend.Security.DTO.LoginCredentialDto;
import com.od.backend.Security.Entities.LoginCredential;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginCredentialMapper {
    LoginCredential mapToEntity(LoginCredentialDto loginCredentialDto);
    LoginCredentialDto mapToDTO(LoginCredential loginCredential);
}
