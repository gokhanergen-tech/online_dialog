package com.od.backend.Security.Repositories;

import com.od.backend.Security.Entities.LoginCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginCredentialsRepository extends JpaRepository<LoginCredentials,Long> {
    Optional<LoginCredentials> findByEmail(String email);
    void deleteByEmail(String email);
}
