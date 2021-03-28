package org.gunchan.tacomo.ws;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import lombok.extern.slf4j.Slf4j;

// https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/socket/server/HandshakeInterceptor.html
// https://stackoverflow.com/questions/56560569/access-http-headers-in-spring-websocket-service
// https://stackoverflow.com/questions/37439104/spring-websockets-how-to-send-a-parameter-on-open-connection

@Slf4j
public class MyWSHandshakeInterceptor implements HandshakeInterceptor{

    // Invoked before the handshake is processed
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // TODO Auto-generated method stub
        
        HttpHeaders headers = request.getHeaders();
        List<String> authorizationHeaders = headers.get("Authorization");
        
        for(String s : authorizationHeaders){
            log.info(s);
        }
        
        attributes.put("testAtt", authorizationHeaders.get(0));
        
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
