package com.od.backend.Usecases.Api.Repositories;

import com.od.backend.Usecases.Api.Entities.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType,Long> {
    Optional<RoomType> findByRoomType(String roomType);
}
