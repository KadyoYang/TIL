package com.template.config.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.template.config.security.filter.CustomAuthenticationFilter;
import com.template.config.security.filter.JWTAuthorizationFilter;
import com.template.config.security.handler.CustomLoginSuccessHandler;
import com.template.config.security.provider.CustomAuthenticationProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomAuthenticationProvider authProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /**
         * 토큰을 활용하는 경우 모든 요청에 대해 접근 가능하게하고 세션이 필요하지않으므로 비활성화 form 기반의 로그인에 대해 비활성화 한다 아
         * 일단 활성화해서 로그인성공까지해서 토큰 클라이언트에 보내긴했는데 그다음부터 클라이언트가 이 토큰을 가지고있다가 요청시마다 보내야하는데
         * 기존의 클라이언트html에서는 하나하나보내야하나,,
         */
        http.csrf().disable()
        .cors().configurationSource(corsConfigurationSource()).and()
        .authorizeRequests()
        .antMatchers("/admin/**").hasRole("ADMIN")
        .antMatchers(
            "/", "/signup", "/test"
            ).permitAll()
            .antMatchers(HttpMethod.GET, "/board/question").permitAll()
            .antMatchers(HttpMethod.GET, "/board/question/*").permitAll()
            .antMatchers(HttpMethod.GET, "/board/question/*/answer").permitAll()
            .antMatchers(HttpMethod.GET, "/board/question/*/answer/*").permitAll()
            .antMatchers(HttpMethod.POST, "/board/question/*/answer/*").permitAll()
        .anyRequest().authenticated().and()
        .formLogin().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                /*
                 * .logout() .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
                 * //.logoutUrl("/logout") .permitAll() .and()
                 */
                .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilter(jwtAuthorizationFilter());

    }
    
    // 패스워드 인코더
    @Bean
    public PasswordEncoder passwordEncoder() {
        // return new BCryptPasswordEncoder();
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    // CustomAuthenticationFilter Bean 생성
    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("/user/login");
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
    public CustomLoginSuccessHandler customLoginSuccessHandler() {
        return new CustomLoginSuccessHandler();
    }


        // https://toycoms.tistory.com/37
    // cors 정책 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        List<String> allowedMethods = new ArrayList<String>(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.addAllowedOrigin("http://localhost:3000");

        configuration.addAllowedHeader("*");
        // configuration.addAllowedHeader("X-Auth-Token");
        // configuration.addAllowedHeader("Origin");
        // configuration.addAllowedHeader("Authorization");

        // configuration.addAllowedMethod("*");
        configuration.setAllowedMethods(allowedMethods);
        configuration.setAllowCredentials(true);
        

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}