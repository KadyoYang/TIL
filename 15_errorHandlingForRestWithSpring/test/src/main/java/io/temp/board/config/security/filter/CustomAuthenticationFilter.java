package io.temp.board.config.security.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.extern.slf4j.Slf4j;


// 이거 쓰지말자 
// xxx-form-urlencoded 같은게 아니라
// json 으로 들엉오면 request.getParameter 로 안된다
// 다음과 같이 받아야한다
// 링크 https://johnmarc.tistory.com/74
@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String userEmail = request.getParameter("email");
        if (userEmail == null) throw new AuthenticationServiceException("userEmail is null");
        String userPw = request.getParameter("password");
        if (userPw == null) throw new AuthenticationCredentialsNotFoundException("userPw is null");

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(userEmail, userPw);
        setDetails(request, authRequest);
        log.info("email pw 파싱 성공 및 매니저에게 인증위임");
        return this.getAuthenticationManager().authenticate(authRequest);

    }


}
