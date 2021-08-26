package com.template.config.security.filter;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.template.config.security.constants.AuthConstants;
import com.template.config.security.utils.TokenUtils;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JWTAuthorizationFilter extends BasicAuthenticationFilter{
    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)throws IOException, ServletException {
        String header = request.getHeader(AuthConstants.AUTH_HEADER);
        log.info("JWTAuthorizationFilter.doFilterInternal()");
        
        if(header != null){
            String token = TokenUtils.getTokenFromHeader(header);
            if(TokenUtils.isValidToken(token)){
                UsernamePasswordAuthenticationToken authentication = getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("JWTAuthrizationFilter.doFilterInternal() context에 authentication 저장");
            }
        }

        // 다음 체인으로 넘긴다
        chain.doFilter(request, response);
        return;
    }

    // read the jwt to make authentication
    private UsernamePasswordAuthenticationToken getAuthentication(String token){
        return new UsernamePasswordAuthenticationToken(
            TokenUtils.getUserEmailFromToken(token),
            null,
            Arrays.asList(new SimpleGrantedAuthority(TokenUtils.getRoleFromToken(token).toString()))
            );
    }

}
