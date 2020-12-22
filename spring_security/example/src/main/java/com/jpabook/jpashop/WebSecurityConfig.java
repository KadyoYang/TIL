package com.jpabook.jpashop;

import com.jpabook.jpashop.security.AccountAuthenticationProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

// 웹시큐리티를 활성화하기위한 어노테이션
// 몇가지 웹시큐리티설정을 하는 메소드를 사용하기 오버라이드 하기위해서 WebSecurityConfigurerAdapter를 상속
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccountAuthenticationProvider authProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.authenticationProvider(authProvider);
    }

    // 어떤 url이 보호되어야하고 어떤것이 보호안되도 되는지 정의
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // TODO Auto-generated method stub
        // /, /home 은 authentication이 불필요
        // 그 외에는 authentication 필요

        // 로그인페이지는 loginPage 메소드로 설정
        // 누구나 접근 가능해야함
        // 성공시 인증요청한 페이지로 리다이렉트
        http
                // 인증이 필요한 모든 요청에 대해
                .authorizeRequests().antMatchers("/", "/home", "/signup").permitAll().anyRequest().authenticated().and()
                .formLogin().loginPage("/login").permitAll().and().logout().logoutUrl("/logout").permitAll();

    }

    /*
     * @Bean
     * 
     * @Override protected UserDetailsService userDetailsService() { UserDetails
     * user = User.withDefaultPasswordEncoder()
     * 
     * // TODO Auto-generated method stub return super.userDetailsService(); }
     */

    // 패스워드 인코더
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    
}
