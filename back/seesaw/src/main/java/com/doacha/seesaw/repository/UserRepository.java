package com.doacha.seesaw.repository;

import com.doacha.seesaw.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> { //JpaRepository<Entity클래스, PK타입>


}
