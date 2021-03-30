package org.gunchan.tacomo;

import java.util.Calendar;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.gunchan.tacomo.testdomain.A;
import org.gunchan.tacomo.testdomain.Master;
import org.gunchan.tacomo.testdomain.MasterType;
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


    @Test
    public void 실험_1() throws JsonProcessingException{
        A a = new A();
        a.setAString("AAA");
        a.setAmount(200);
        a.setType(MasterType.A);

        String aJson = objectMapper.writeValueAsString(a);
        log.info(aJson);

        // Master m = objectMapper.readValue(aJson, Master.class);
        // log.info(m.getType().toString()); 필요없는 필드가 있으면 예외뿜는다


    }

    
}
