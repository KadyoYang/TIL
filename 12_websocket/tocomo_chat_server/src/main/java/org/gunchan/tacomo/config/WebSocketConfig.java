package org.gunchan.tacomo.config;

import org.gunchan.tacomo.ws.ChatManager;
import org.gunchan.tacomo.ws.MyHandler;
import org.gunchan.tacomo.ws.MyWSHandshakeInterceptor;
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
        arg0.addHandler(myHandler(), "/ws").addInterceptors(myWSHandshakeInterceptor()).setAllowedOrigins("*");
        
    }

    @Bean
    public MyHandler myHandler(){
        return new MyHandler();
    }

    @Bean
    public ChatManager chatManager(){
        return new ChatManager();
    }

    @Bean 
    public MyWSHandshakeInterceptor myWSHandshakeInterceptor(){
        return new MyWSHandshakeInterceptor();
    }
    
}
