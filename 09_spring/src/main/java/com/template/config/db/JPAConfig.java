package com.template.config.db;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Configuration
@EnableTransactionManagement
public class JPAConfig {
    @Autowired DataSource dataSource;

        // Dev 용 설정
        Properties devProperties() {
            Properties properties = new Properties();
            properties.setProperty("hibernate.dialect", "org.hibernate.dialect.H2Dialect");
    
            properties.setProperty("open-in-view", "false");
            properties.setProperty("hibernate.id.new_generator_mappings", "true");
    
            // 스키마 자동생성
            properties.setProperty("hibernate.hbm2ddl.auto", "update");
    
            // 디버그용 설정
            properties.setProperty("hibernate.show_sql", "true");
            properties.setProperty("hibernate.format_sql", "true");
            return properties;
        }

    // Prod 용 설정
    Properties prodProperties() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect","org.hibernate.dialect.PostgreSQLDialect");

        properties.setProperty("open-in-view", "false");
        properties.setProperty("hibernate.id.new_generator_mappings", "true");

        // 스키마 자동생성
        properties.setProperty("hibernate.hbm2ddl.auto", "update");

        // 디버그용 설정
        properties.setProperty("hibernate.show_sql", "false");
        properties.setProperty("hibernate.format_sql", "false");
        return properties;
    }

    /**
     * LocalContainerEntityManagerFactoryBean은 jpa를 스프링 컨테이너에서 사용할 수 있도록 스프링 프레임워크가 제공하는 기능
     * @return
     */
    @Bean(name = "emf")
    @Profile({"dev", "default"})
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryDev() {
        log.info("initialize Dev EntityManagerFactoryBean...");
        LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
        emf.setDataSource(dataSource); // 데이터소스 설정

        emf.setPackagesToScan(new String[] { "com.template.domain" }); //@Entity가 붙은 클래스를 자동검색하기위한 시작점 지정

        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter(); // JPA 벤더 어댑터 지정, 여기서는 hibernate를 사용하므로 하이버네이트 입력
        emf.setJpaVendorAdapter(vendorAdapter);
        emf.setJpaProperties(devProperties());
        return emf;
    }

    @Bean(name = "emf")
    @Profile({"production"})
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryProd() {
        log.info("initialize Production EntityManagerFactoryBean...");
        LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
        emf.setDataSource(dataSource); // 데이터소스 설정

        emf.setPackagesToScan(new String[] { "com.template.domain" }); //@Entity가 붙은 클래스를 자동검색하기위한 시작점 지정

        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter(); // JPA 벤더 어댑터 지정, 여기서는 hibernate를 사용하므로 하이버네이트 입력
        emf.setJpaVendorAdapter(vendorAdapter);
        emf.setJpaProperties(prodProperties());
        return emf;
    }

    @Bean
    public PlatformTransactionManager transactionManager(LocalContainerEntityManagerFactoryBean emf) {
        log.info("initialize TransactionManager...");
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emf.getObject());

        return transactionManager;
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
        return new PersistenceExceptionTranslationPostProcessor();
    }
    
}
