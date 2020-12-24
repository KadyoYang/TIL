package com.jpabook.jpashop.security.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jpabook.jpashop.security.TokenUtils;
import com.jpabook.jpashop.security.constants.AuthConstants;

import org.springframework.web.servlet.HandlerInterceptor;

import lombok.extern.slf4j.Slf4j;

/**
 * 토큰을 검증하도록 설정한 API에 대해 요청을 intercept하여 토큰의 유효성 검사를 진행 
 * 유효성 검사에 실패하면 예외 api로 redirect
 */
@Slf4j
public class JwtTokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String header = request.getHeader(AuthConstants.AUTH_HEADER);

        if(header != null){
            String token = TokenUtils.getTokenFromHeader(header);
            if(TokenUtils.isValidToken(token)){
                return true;
            }
        }

        response.sendRedirect("/error/unauthorized");
        return false;
    }
    


}
