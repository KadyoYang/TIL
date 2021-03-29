package org.gunchan.tacomo;

import java.util.Calendar;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.gunchan.tacomo.ws.domain.Chat;
import org.gunchan.tacomo.ws.domain.TacomoMessage;
import org.junit.Test;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JacksonDatabindTest {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    @Test
    public void 할로(){
        log.info("hello");
    }

    @Test
    public void EnumToJson테스트() throws JsonProcessingException{
        
        TacomoMessage tm = TacomoMessage.createChatMessage("보낸이", "안녕", Calendar.getInstance().getTime());
        String tmJsonString = objectMapper.writeValueAsString(tm);
        log.info(tmJsonString);
        TacomoMessage temp = objectMapper.readValue(tmJsonString, TacomoMessage.class);
        log.info(temp.getType().toString());
        log.info(objectMapper.readValue(temp.getJsonMessage(), Chat.class).getSender());
        
    }

    
}
