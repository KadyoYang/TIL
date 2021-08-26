package com.jpabook.jpashop;

import com.jpabook.jpashop.security.AccountAuthenticationProvider;
import com.jpabook.jpashop.security.CustomAuthenticationFilter;
import com.jpabook.jpashop.security.CustomLoginSuccessHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// 웹시큐리티를 활성화하기위한 어노테이션
// 몇가지 웹시큐리티설정을 하는 메소드를 사용하기 오버라이드 하기위해서 WebSecurityConfigurerAdapter를 상속
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccountAuthenticationProvider authProvider;

    /**
     * 직접 구현한 AccountAuthentcaitonProvider를 매니저에 포함
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.authenticationProvider(authProvider);
    }

    // 정적 자원에 대해서 security 적용하지 않음
    @Override
    public void configure(WebSecurity web) {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
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

        /*
        /admin 은 ADMIN 권한이 필요
        /, /home, /signup 은 로그인을 요구하지않음
        anyRequest 로그인 필요

        로그인 페이지 /login 경로 permitAll
        로그아웃도 permitAll

        post할때마다 csrf 토큰이 일단 필요한데 그거 일단 disable
        */
        // csrf 엔에이블하면 logout post로 csrf방지하고 같이 보내야한다.
        http
        // .csrf().disable()
        .authorizeRequests()
            .antMatchers("/admin")
                .hasRole("ADMIN")
            .antMatchers(
                "/",
                "/home",
                "/signup/**",
                // "/signup/proc",
                "/error")
                .permitAll()
            .anyRequest()
                .authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                // .loginProcessingUrl(loginProcessingUrl)
                .successForwardUrl("/welcome")
                .failureForwardUrl("/home")
                .permitAll()
                .and()
            .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
                //.logoutUrl("/logout")
                .permitAll()
                .and()
            .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
                
            

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
        // return new BCryptPasswordEncoder();
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // CustomAuthenticationFilter Bean 생성
    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() throws Exception{
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("/login/proc");
        customAuthenticationFilter.setAuthenticationSuccessHandler(customLoginSuccessHandler());
        customAuthenticationFilter.afterPropertiesSet();
        return customAuthenticationFilter;
    }

    @Bean
    public CustomLoginSuccessHandler customLoginSuccessHandler(){
        return new CustomLoginSuccessHandler();
    }


    
}
