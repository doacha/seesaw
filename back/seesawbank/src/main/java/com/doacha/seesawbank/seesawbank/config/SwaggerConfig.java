package com.doacha.seesawbank.seesawbank.config;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "시소Bank API 명세서",
                description = "시소 어플리케이션을 위한 시소 Bank API 명세서입니다.",
                version = "v1"))
@Configuration
public class SwaggerConfig {
}
