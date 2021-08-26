package com.jpabook.jpashop.oauth;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.github.scribejava.core.model.OAuth2AccessToken;
import com.jpabook.jpashop.oauth.naver.NaverLoginBO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping(value = "/oauth")
@Controller
public class OAuthController {
    @Autowired
    NaverLoginBO naverLoginBO;

    @RequestMapping(value = "/naver/login", method = RequestMethod.GET)
    public ModelAndView naverLogin(HttpSession session) {
        log.info("네이버로 로그인 요청 수신");
        // 네아로 인증 url 생성
        String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
        log.info("네아로 인증 url 생성 및 뷰 전달 url : " + naverAuthUrl);
        // 네아로 인증 url로 이동시키는 뷰, url 전달
        return new ModelAndView("login/oauth", "url", naverAuthUrl);
    }

    @RequestMapping(value = "/naver/callback", method = RequestMethod.GET)
    public ModelAndView naverLoginCallback(@RequestParam String code, @RequestParam String state, HttpSession session,
            Model model) throws IOException {
        
        // 네아로 인증이 성공적으로 완료되면 code(authorization code로 판단됨) 파라미터가 전달된다
        log.info("네아로 콜백 수신");
        log.info("authorization code : " + code);
        log.info("state(변조방지값) : " + state);
        // error, error_description 이 두가지 파라미터는 에러 발생신데 일단은 빼두자
        // https://developers.naver.com/docs/login/api/ 참고

        OAuth2AccessToken oauthToken = naverLoginBO.getAccessToken(session, code, state);
        log.info("액세스 토큰 발급받음");
        log.info("액세스 토큰 : " + oauthToken.getAccessToken());
        log.info("액세스 토큰 raw response : " + oauthToken.getRawResponse());
        log.info("액세스 토큰 refresh token: " + oauthToken.getRefreshToken());
        log.info("액세스 토큰 스코프: " + oauthToken.getScope());
        log.info("액세스 토큰 토큰 타입: " + oauthToken.getTokenType());
        log.info("액세스 토큰 유효시간: " + oauthToken.getExpiresIn());

        String apiResult = naverLoginBO.getUserProfile(oauthToken);
        log.info("유저 프로파일 가져오는 api 사용함");
        log.info("result : " + apiResult);
        
        // 이후는 유저 테이블에 관련정보넣고 세션유지 or jwt 토큰 발행 
        // enum type 으로 logintype.NAVER 식으로 

        Map<String, Object> map = new HashMap<>();
        map.put("msg", "Naver계정으로 로그인에 성공했습니다");
        // 실제는 예외 잡아서 실패메시지 보내는등으로 하자
        
        return new ModelAndView("login/oauthfin", map);
    }
    
    
}
