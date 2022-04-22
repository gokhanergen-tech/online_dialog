package com.od.backend.Security.Repositories;

import com.od.backend.Security.Entities.LoginCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginCredentialsRepository extends JpaRepository<LoginCredential,Long> {
    Optional<LoginCredential> findByEmail(String email);
    void deleteByEmail(String email);
}
