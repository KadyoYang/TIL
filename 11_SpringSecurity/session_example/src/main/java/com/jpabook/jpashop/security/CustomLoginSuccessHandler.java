package com.jpabook.jpashop.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        // TODO Auto-generated method stub
        SecurityContextHolder.getContext().setAuthentication(authentication);
        response.sendRedirect("/welcome");
        // 세션을 활용하는 이 예제에서는 성공하여 반환된 Authentication객체를 SecurityContextHolder의 context에 저장
        // 나중에 사용자 정보를 꺼낼경우에도 SecurityHolder의 context에서 조회
    }
    
    
}
