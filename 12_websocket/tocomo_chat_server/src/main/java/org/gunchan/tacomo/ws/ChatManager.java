package org.gunchan.tacomo.ws;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

public class ChatManager {
    private volatile Map<String, WebSocketSession> members = new HashMap<String, WebSocketSession>();
    

    public synchronized void addMember(String name, WebSocketSession session){
        members.put(name, session);
    }
    public synchronized void removeMember(String name){
        members.remove(name);
    }

    public void sendMessageToAll(){
        for(WebSocketSession wss: members.values()){
            // wss.sendMessage(message);
        }
    }

    public void sendMessageToSomeoneYouLoved(String name){
        // members.get(name).sendMessage(message);
    }
    
    
}
