package org.gunchan.tacomo;

import java.util.Calendar;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.junit.Test;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JacksonDatabindTest {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    @Test
    public void 할로(){
        log.info("hello");
    }




    
}
