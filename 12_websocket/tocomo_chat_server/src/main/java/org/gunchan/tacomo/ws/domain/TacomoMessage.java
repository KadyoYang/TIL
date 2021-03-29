package org.gunchan.tacomo.ws.domain;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TacomoMessage {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    private TacomoMessageType type;
    private String jsonMessage;

    public static TacomoMessage createChatMessage(String sender, String message, Date date) throws JsonProcessingException{
        TacomoMessage tacomoMessage = new TacomoMessage();
        Chat chat = new Chat(sender, message, date);
        tacomoMessage.type = TacomoMessageType.CHAT;
        tacomoMessage.jsonMessage = objectMapper.writeValueAsString(chat);
        return tacomoMessage;
    }

    public Chat parseChat() throws JsonMappingException, JsonProcessingException{
        return objectMapper.readValue(this.jsonMessage, Chat.class);
    }

    public static TacomoMessage createParticipantsMessage(Set<String> participants) throws JsonProcessingException{
        TacomoMessage tacomoMessage = new TacomoMessage();
        tacomoMessage.type = TacomoMessageType.PARTICIPANTS;
        tacomoMessage.jsonMessage = objectMapper.writeValueAsString(participants);
        return tacomoMessage;
    }
}
