package com.jpabook.jpashop;

import javax.sql.DataSource;

import com.zaxxer.hikari.HikariDataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.orm.jpa.JpaTransactionManager;

// root-context.xml 대체용 자바 config
/**
 * https://medium.com/@breadmj/spring-3-xml-%EC%97%86%EC%9D%B4-java%EB%A7%8C-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-3bbd6316dce
 * root-context에는 
 * 주로 프로퍼티 플레이스 홀더 설정
 * datasource같이 여러 서블릿에서 공통으로 사용할 설정들이 들어간다
 * 서블릿을 하나만 띄운다면 root-context와 servlet context를 구분할 필요는 없다
 * 
 *  classpath:/ 는 런타임시에 그 경로를 말한거지
 * 그 .classpath 에 /src/main/resources -> output > target/classes 로 가니까 
 * 그냥 /application.properties 를 써줘야한다
 */

@Configuration
public class RootConfig {
    private static final Logger logger = LoggerFactory.getLogger(RootConfig.class);
/*     @Value("${jdbc.driverClassName}")
    private String jdbcDriverClassName;
    @Value("${jdbc.url}")
    private String jdbcUrl;
    @Value("${jdbc.username}")
    private String jdbcUsername;
    @Value("${jdbc.password}")
    private String jdbcPassword;
 */

    

}

