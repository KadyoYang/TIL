package org.gunchan.tacomo.ws;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.gunchan.tacomo.ws.domain.TacomoMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class ChatManager {
    private volatile Map<String, WebSocketSession> members = new HashMap<String, WebSocketSession>();
    private static final ObjectMapper objectMapper = new ObjectMapper();
    

    public synchronized void addMember(String name, WebSocketSession session){
        members.put(name, session);
    }
    public synchronized void removeMember(String name){
        members.remove(name);
    }

    public void sendMessageToAll(TacomoMessage tacomoMessage) throws IOException{
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(tacomoMessage));
        for(WebSocketSession wss: members.values()){
            wss.sendMessage(textMessage);
            // it has concurrent issue 
            // use ConcurrentWebsocketSessionDecorator
        }
    }
    
    public void sendMessage(String name, TacomoMessage tacomoMessage) throws IOException{
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(tacomoMessage));
        members.get(name).sendMessage(textMessage);
    }

    public Set<String> getMemberList(){
        return members.keySet();
    }

    // public void sendParticipants(String name)throws IOException{
    //     members.get(name).sendMessage(new TextMessage(objectMapper.writeValueAsString(members.keySet())));
    // }

    // public void sendInValidCommandWarning(String name) throws JsonProcessingException, IOException{
    //     members.get(name).sendMessage(new TextMessage(objectMapper.writeValueAsString(TacomoMessage.createChatMessage(name, "invalid command", Calendar.getInstance().getTime()))));
    // }
    
}
