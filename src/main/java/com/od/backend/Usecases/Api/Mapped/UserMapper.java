package com.od.backend.Usecases.Api.Mapped;

import com.od.backend.Usecases.Api.DTO.UserDto;
import com.od.backend.Usecases.Api.Entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User mapToEntity(UserDto userDto);
    UserDto mapToDTO(User user);
}
