package org.gunchan.tacomo.ws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry arg0) {
        // TODO Auto-generated method stub
        arg0.addHandler(myHandler(), "/ws");//.withSockJS();
        
    }

    @Bean
    public WebSocketHandler myHandler(){
        return new MyHandler();
    }
    
}
