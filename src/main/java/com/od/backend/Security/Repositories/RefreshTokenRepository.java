package com.od.backend.Security.Repositories;

import com.od.backend.Security.Entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken,Long> {

    @Query(nativeQuery = true,value = "select * from auth.refresh_tokens  where user_id=?1")
    public Optional<RefreshToken> findByUserId(Long userId);
}
