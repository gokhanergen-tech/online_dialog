package com.od.backend.Security.Repositories;

import com.od.backend.Security.Entities.LoginCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginCredentialsRepository extends JpaRepository<LoginCredential,Long> {
    Optional<LoginCredential> findByEmail(String email);
    void deleteByEmail(String email);
}
