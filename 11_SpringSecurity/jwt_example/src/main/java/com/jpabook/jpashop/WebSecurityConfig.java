package com.jpabook.jpashop;

import com.jpabook.jpashop.security.AccountAuthenticationProvider;
import com.jpabook.jpashop.security.CustomAuthenticationFilter;
import com.jpabook.jpashop.security.JWTAuthorizationFilter;
import com.jpabook.jpashop.security.handler.CustomLoginSuccessHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
        /**
         * 토큰을 활용하는 경우 모든 요청에 대해 접근 가능하게하고
         * 세션이 필요하지않으므로 비활성화
         * form 기반의 로그인에 대해 비활성화 한다
         * 아 일단 활성화해서 로그인성공까지해서 토큰 클라이언트에 보내긴했는데
         * 그다음부터 클라이언트가 이 토큰을 가지고있다가 요청시마다 보내야하는데
         * 기존의 클라이언트html에서는 하나하나보내야하나,,
         */
        http
        // .csrf().disable()
        .authorizeRequests()
        .antMatchers("/admin")
            .hasRole("ADMIN")
        .antMatchers(
            "/",
            "/home",
            "/signup/**",
            "/login/**",
            "/error")
            .permitAll()
        .anyRequest()
            .authenticated()
            .and()
        .formLogin()
            .loginPage("/login")
            // .loginProcessingUrl(loginProcessingUrl)
            // .successForwardUrl("/welcome") customAuthenticationFilter에 성공시핸들러 만든거 붙였더니 이거 작동을 안한다 여기 쓰나마나다
            .failureForwardUrl("/home")
            .permitAll()
            .and()
        .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
        .logout()
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
            //.logoutUrl("/logout")
            .permitAll()
            .and()
            .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            .addFilter(jwtAuthorizationFilter());

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
    // JWTAuthorizationFilter Bean 
    @Bean
    public JWTAuthorizationFilter jwtAuthorizationFilter() throws Exception {
        return new JWTAuthorizationFilter(authenticationManager());
    }

    @Bean
    public CustomLoginSuccessHandler customLoginSuccessHandler(){
        return new CustomLoginSuccessHandler();
    }


    
}
