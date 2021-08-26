package io.temp.board.service;

import org.springframework.stereotype.Service;

import io.temp.board.controller.exception.TestException;
import io.temp.board.controller.exception.TestRuntimeException;

@Service
public class TestService {
    
    public void throwTestRuntimeException(){
        throw new TestRuntimeException("hehe eat this Custom runtimeException");
    }
    public void throwRuntimeException(){
        throw new RuntimeException("hehe eat this runtimeException");
    }

    public void throwTestException() throws TestException{
        throw new TestException("heh this is a Custom Exception");
    }

    public void throwException() throws Exception{
        throw new TestException("heh this is a Exception");
    }
}
