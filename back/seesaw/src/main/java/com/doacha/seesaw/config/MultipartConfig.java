package com.doacha.seesaw.config;

import io.lettuce.core.dynamic.annotation.Value;
import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@Configuration
public class MultipartConfig {

    @Bean
    public MultipartResolver multipartResolver() {
        StandardServletMultipartResolver multipartResolver = new StandardServletMultipartResolver();
        return multipartResolver;
    }
//    @Bean
//    public MultipartResolver multipartResolver(){
//        org.springframework.web.multipart.commons.CommonsMultipartResolver multipartResolver = new
//                org.springframework.web.multipart.commons.CommonsMultipartResolver();
//
//        multipartResolver.setMaxUplaodSize(10485760); //1024 * 1024 * 10 (최대 10MB)
//        return multipartResolver;
//    }
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();

        return factory.createMultipartConfig();
    }
}