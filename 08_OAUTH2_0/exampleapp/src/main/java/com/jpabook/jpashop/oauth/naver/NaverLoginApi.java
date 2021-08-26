package com.jpabook.jpashop.oauth.naver;

import com.github.scribejava.core.builder.api.DefaultApi20;

public class NaverLoginApi extends DefaultApi20{

    protected NaverLoginApi(){}
    private static class InstanceHolder{
        private static final NaverLoginApi INSTANCE = new NaverLoginApi();
    }
    public static NaverLoginApi instance(){
        return InstanceHolder.INSTANCE;
    }

    @Override
	public String getAccessTokenEndpoint() {
        // 출력포맷 json, 액세스토큰 발급, 갱신, 삭제 때 쓰인다
		return "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code";
	}

	@Override
	protected String getAuthorizationBaseUrl() {
        // 실제 네이버 로그인 폼 페이지
		return "https://nid.naver.com/oauth2.0/authorize";
	}
}
    
