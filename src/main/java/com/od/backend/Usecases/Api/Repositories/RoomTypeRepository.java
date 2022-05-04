package com.od.backend.Usecases.Api.Repositories;

import com.od.backend.Usecases.Api.Entities.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomTypeRepository extends JpaRepository<RoomType,Long> {
}
