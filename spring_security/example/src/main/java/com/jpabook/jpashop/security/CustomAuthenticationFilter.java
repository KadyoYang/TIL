package com.jpabook.jpashop.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.extern.log4j.Log4j2;

/**
 * CustomeAuthenticationFilter extends UsernamePasswordAuthenticationFilter 기존것을
 * UsernamePasswordAuthenticationFilter 그냥 써도 되지만 Filter를 직접 구현
 * 직접 제작한 Filter를 적용시키려면 기존 UsernamePasswordAuthenticationFilter 이전에 적용시켜야하고
 * CustomAuthenticaitonFilter가 수행된 후에 처리될 Handler를 Bean으로 등록하고 CustomAuthenticationFilter의 핸들러로 추가해주어야한다.
 * -> WebSecurityConfig.java에 추가함
 */
@Log4j2
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    /**
     * 여기서 추가적인 유효성검사를 userEmail userPw에 해주는게 좋을수있다.
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String userEmail = request.getParameter("userEmail");
        if (userEmail == null) throw new AuthenticationServiceException("userEmail is null");
        String userPw = request.getParameter("userPw");
        if (userPw == null) throw new AuthenticationCredentialsNotFoundException("userPw is null");

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(userEmail, userPw);
        setDetails(request, authRequest);
        return this.getAuthenticationManager().authenticate(authRequest);
    }

    
}
