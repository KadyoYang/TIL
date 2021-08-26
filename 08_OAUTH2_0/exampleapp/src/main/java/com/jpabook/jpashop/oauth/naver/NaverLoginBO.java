package com.jpabook.jpashop.oauth.naver;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;

import org.springframework.stereotype.Component;

@Component
public class NaverLoginBO {
    private final static String CLIENT_ID = "기밀 ㅎ";
    private final static String CLIENT_SECRET = "기이이밀 ㅎㅎ";
    private final static String REDIRECT_URI = "http://127.0.0.1/oauth/naver/callback";
    private final static String SESSION_STATE = "oauth_state";

    /* 프로필 조회 API URL */
    private final static String PROFILE_API_URL = "https://openapi.naver.com/v1/nid/me";

    /**
     * 네아로 인증 url 생성
     */
    public String getAuthorizationUrl(HttpSession session) {
        // 세션 유효성 검증을 위한 난수 생성 및 세션에 저장
        String state = generateRandomString();
        setStateIntoSession(session, state);

        OAuth20Service oauthService = new ServiceBuilder().apiKey(CLIENT_ID).apiSecret(CLIENT_SECRET)
                .callback(REDIRECT_URI).state(state).build(NaverLoginApi.instance());
        return oauthService.getAuthorizationUrl();
    }

    /**
     * 네아로 callback 처리 및 access token 획득
     * 
     * @throws IOException
     */
    public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws IOException {
        String sessionState = getStateFromSession(session);
        if(state != null & state.contentEquals(sessionState)){
            OAuth20Service oauthService = new ServiceBuilder()
            .apiKey(CLIENT_ID)
            .apiSecret(CLIENT_SECRET)
            .callback(REDIRECT_URI)
            .state(state)
            .build(NaverLoginApi.instance());

            // scribe 라이브러리가 제공하는 access token 획득 메소드로 액세스 토큰 획득
            OAuth2AccessToken accessToken = oauthService.getAccessToken(code);
            return accessToken;
        }
        return null;
    }



    // ########################### private 메소드
    private String generateRandomString(){
        return UUID.randomUUID().toString();
    }
    private void setStateIntoSession(HttpSession session, String state){
        session.setAttribute(SESSION_STATE, state);
    }
    private String getStateFromSession(HttpSession session){
        return (String)session.getAttribute(SESSION_STATE);
    }

    // ######################## 리소스 서버에 서비스 요청
    public String getUserProfile(OAuth2AccessToken oauthToken) throws IOException {
        OAuth20Service oauthService = new ServiceBuilder().apiKey(CLIENT_ID).apiSecret(CLIENT_SECRET).callback(REDIRECT_URI).build(NaverLoginApi.instance());
        OAuthRequest request = new OAuthRequest(Verb.GET, PROFILE_API_URL, oauthService);
        oauthService.signRequest(oauthToken, request);
        Response response = request.send();
        return response.getBody();
    }


}
