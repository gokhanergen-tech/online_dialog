package com.od.backend.Security.DTO;

import com.od.backend.Usecases.Api.DTO.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginCredentialDto {
    private String email;
    private UserDto userDto;

    public LoginCredentialDto(String email, UserDto userDto) {
        this.email = email;
        this.userDto = userDto;
    }
}
