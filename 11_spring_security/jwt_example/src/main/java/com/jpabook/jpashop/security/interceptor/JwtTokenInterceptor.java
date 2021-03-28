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
 * 이 인터셉트 대신에 BasicAuthentication Filter 에서 할수있을까
 * 아니 그보다 누가 먼저 도착하지 로그 찍어보자 
 * security Filter를 먼저 지나가고 그다음 여기 인터셉터에 걸린다.
 */
@Slf4j
public class JwtTokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String header = request.getHeader(AuthConstants.AUTH_HEADER);
        log.info("JwtTokenInterceptor.preHandle()");
        if(header != null){
            String token = TokenUtils.getTokenFromHeader(header);
            if(TokenUtils.isValidToken(token)){
                log.info("JwtTokenInterceptor.preHandle() token 유효 true 리턴");
                return true;
            }
        }
        // jwtauthorization filter와 동시에 쓰이면 무한루프에 걸리므로 주석
        // response.sendRedirect("/error/unauthorized");
        return true;
    }
    


}
