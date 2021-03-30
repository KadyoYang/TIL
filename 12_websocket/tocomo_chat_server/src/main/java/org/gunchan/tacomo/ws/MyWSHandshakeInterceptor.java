package org.gunchan.tacomo.ws;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import lombok.extern.slf4j.Slf4j;

// https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/socket/server/HandshakeInterceptor.html
// https://stackoverflow.com/questions/56560569/access-http-headers-in-spring-websocket-service
// https://stackoverflow.com/questions/37439104/spring-websockets-how-to-send-a-parameter-on-open-connection


// HttpSessionHandshakeInterceptor
@Slf4j
public class MyWSHandshakeInterceptor implements HandshakeInterceptor{

    // Invoked before the handshake is processed
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // TODO Auto-generated method stub
        
        /*
        // deprecated 
        // 이 방법 말고 queryString에다 넣어라 임시 jwt토큰 티켓을 발급받아서 보내라
        HttpHeaders headers = request.getHeaders();
        List<String> authorizationHeaders = headers.get("Authorization");

        for(String s : authorizationHeaders){
            log.info(s);
        }
        attributes.put("testAtt", authorizationHeaders.get(0));
        */
        ServletServerHttpRequest ssreq = (ServletServerHttpRequest)request;
        log.info("URI " + request.getURI());
        HttpServletRequest req = ssreq.getServletRequest();
        
        // req.getSession().getAttribute("something"); http 세션 접근
        String userName = req.getParameter("username");// 만약에 base64인코딩된 임시jwt토큰넣을때는 url 인코딩 확인하라
        
        attributes.put("testAtt", userName);
        
        
        // false means abort 
        // true means it's good to proceed 
        return true;
    }

    //Invoked after the handshake is done.
    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // TODO Auto-generated method stub
        
    }
    
}
