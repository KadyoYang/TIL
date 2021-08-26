package io.temp.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.temp.board.controller.exception.Ex3TestException;
import io.temp.board.controller.exception.Ex3TestRuntimeException;
import io.temp.board.controller.exception.TestRuntimeException;
import io.temp.board.service.AccountService;
import io.temp.board.service.TestService;

@RestController
@RequestMapping("/nonsec/test4")
public class Ex4Controller {
    @Autowired TestService testService;
    @Autowired AccountService accountService;

    @GetMapping("/runtime/0")
    private String runtimetest(){
        try{
            throw new TestRuntimeException("inside of Controller"); 
        }catch(TestRuntimeException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Foo not found", ex);
        }
    }


    @GetMapping("/runtime/3")
    private String customRuntimeInsideServiceTest(){
        try{
            throw new Ex3TestRuntimeException("adsf");

        }catch(Ex3TestRuntimeException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Foo not found", ex);
        }
    }

    @GetMapping("/nonruntime")
    private String testNonRuntime(){
        try{
            throw new Ex3TestException("ㅡㅇ에");
        }catch(Exception e){
            
        }
        return "whoa";

    }

}
