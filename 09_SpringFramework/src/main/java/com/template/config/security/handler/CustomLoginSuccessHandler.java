package com.template.config.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.template.config.security.AccountUserDetail;
import com.template.config.security.constants.AuthConstants;
import com.template.config.security.utils.TokenUtils;
import com.template.domain.SampleAccount;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler{
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        // TODO Auto-generated method stub
        // SecurityContextHolder.getContext().setAuthentication(authentication);
        SampleAccount account = ((AccountUserDetail)authentication.getPrincipal()).getAccount();

        String token = TokenUtils.generateJwtToken(account);

        response.addHeader(AuthConstants.AUTH_HEADER, AuthConstants.TOKEN_TYPE + " " + token);
        // response.sendRedirect("/welcome");
        response.addHeader("Access-Control-Expose-Headers", AuthConstants.AUTH_HEADER); 
        // axios가 이거 없으면 안보여준다 토큰헤더를;; 아니 리스폰스에는 떡하니 보이는데 -> 보안을 위해서 그랬다고함
        // https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields 참고
    }
}
