package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Group, String> { //JpaRepository<Entity클래스, PK타입>


}
