package com.snehasish.releaseplanner.svc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SvcApplication {

    public static void main(String[] args) {
        SpringApplication.run(SvcApplication.class, args);
    }

    @GetMapping("/")
    public String hello() {
        return "Hello from Spring Boot 3.5.7!";
    }

    @GetMapping("/version")
    public String version() {
        return "Spring Boot Version: " + org.springframework.boot.SpringBootVersion.getVersion();
    }
}