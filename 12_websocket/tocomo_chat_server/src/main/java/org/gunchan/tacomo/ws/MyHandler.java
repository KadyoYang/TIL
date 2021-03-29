package org.gunchan.tacomo.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MyHandler extends TextWebSocketHandler{

    @Autowired ChatManager chatManager;

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

        String userName = session.getAttributes().get("testAtt").toString();
        chatManager.removeMember(userName);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        
        String userName = session.getAttributes().get("testAtt").toString();
        chatManager.addMember(userName, session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        String userName = session.getAttributes().get("testAtt").toString();
        log.info(userName);

    }
    
}
