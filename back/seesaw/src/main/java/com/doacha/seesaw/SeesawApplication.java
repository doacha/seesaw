package com.doacha.seesaw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SeesawApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeesawApplication.class, args);
    }

}
