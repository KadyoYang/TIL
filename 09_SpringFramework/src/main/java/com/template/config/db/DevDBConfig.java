package com.template.config.db;

import javax.sql.DataSource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@Profile({"dev", "default"})
@PropertySource("classpath:META-INF/devDB.properties") 
// xml 임포트
// @ImportResource(locations = "classpath:META-INF/appConfig.xml")
public class DevDBConfig {

    // xml 임포트
    /* @Value("#{dbProps.driverClassName}")
    private String driverClass; */

    @Value("${jdbc.driverClassName}")
    private String className;
    @Value("${jdbc.url}")
    private String jdbcUrl;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource dataSource(){
        log.info("initialize Dev DataSource...");
        HikariConfig hikariConfig = new HikariConfig();
        
        // DataSourceClassName 이 아니다. DriverClassName이다 헷갈리지 말도록
        hikariConfig.setDriverClassName(className);
        hikariConfig.setJdbcUrl(jdbcUrl);
        hikariConfig.setUsername(username);
        hikariConfig.setPassword(password);
        // https://github.com/brettwooldridge/HikariCP
        
        return new HikariDataSource(hikariConfig);
    }


  
    
}
