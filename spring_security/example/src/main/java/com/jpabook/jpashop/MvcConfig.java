package com.jpabook.jpashop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

/**
 * servlet-context.xml 의 역할을 대신한다 mvc:annotation-driven == @EnableWebMvc
 * task:annotation-driven == @EnableAsync 필요한 기능들은 이렇게 어노테이션으로 활성화 가능
 */



@Configuration
// @EnableWebMvc
// @PropertySource("classpath:/application.properties")
public class MvcConfig implements WebMvcConfigurer {
    // 인터셉터 추가하기 위해 WebMvcConfigurer 구현
    private static final Logger logger = LoggerFactory.getLogger(MvcConfig.class);

    @Bean
    public ViewResolver viewResolver() {
        logger.info("뷰 리졸버 생성");
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        resolver.setViewClass(JstlView.class);
        return resolver;
    } 

    /* @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // TODO Auto-generated method stub
        registry.addResourceHandler("/webapp/WEB-INF/views/**")
            .addResourceLocations("/webapp/WEB-INF/views/");
            
        WebMvcConfigurer.super.addResourceHandlers(registry);
    } */

    /** * 인터셉터 추가 */
    /*
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CorsInterceptor());
    }
    */
    

}
    