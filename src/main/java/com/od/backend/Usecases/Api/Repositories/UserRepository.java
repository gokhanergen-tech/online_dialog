package com.od.backend.Usecases.Api.Repositories;

import com.od.backend.Security.Entities.LoginCredentials;
import com.od.backend.Usecases.Api.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

}
