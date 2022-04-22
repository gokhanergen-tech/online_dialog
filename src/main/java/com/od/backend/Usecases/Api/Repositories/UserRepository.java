package com.od.backend.Usecases.Api.Repositories;

import com.od.backend.Usecases.Api.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

}
