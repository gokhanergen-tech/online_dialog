package com.od.backend.Usecases.Api.Repositories;

import com.od.backend.Usecases.Api.Entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {

    @Query(nativeQuery = true,value = "select true from \"user\".rooms where title=?1")
    public Optional<Boolean> isRoomExist(String title);

}
