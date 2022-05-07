package com.od.backend.Security.Repositories;

import com.od.backend.Security.Entities.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority,Long> {
    @Query(nativeQuery = true,value = "select * from auth.authorities where authority=?1")
    Optional<Authority> findByAuthority(String authority);
}
