package com.jpabook.jpashop.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jpabook.jpashop.domain.Account;
import com.jpabook.jpashop.security.AccountUserDetail;
import com.jpabook.jpashop.security.TokenUtils;
import com.jpabook.jpashop.security.constants.AuthConstants;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        // TODO Auto-generated method stub
        // SecurityContextHolder.getContext().setAuthentication(authentication);
        Account account = ((AccountUserDetail)authentication.getPrincipal()).getAccount();

        String token = TokenUtils.generateJwtToken(account);

        response.addHeader(AuthConstants.AUTH_HEADER, AuthConstants.TOKEN_TYPE + " " + token);
        response.sendRedirect("/welcome");
    }
    
    
}
