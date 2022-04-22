package com.od.backend.Usecases.Api.Mapped;

import com.od.backend.Usecases.Api.DTO.UserDto;
import com.od.backend.Usecases.Api.Entities.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-04-21T21:38:33+0300",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 14.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User mapToEntity(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        User user = new User();

        user.setFullName( userDto.getFullName() );
        user.setOwner( userDto.isOwner() );

        return user;
    }

    @Override
    public UserDto mapToDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setFullName( user.getFullName() );
        userDto.setOwner( user.isOwner() );

        return userDto;
    }
}
