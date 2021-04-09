package io.temp.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.temp.board.controller.exception.Ex3TestException;
import io.temp.board.controller.exception.Ex3TestRuntimeException;
import io.temp.board.controller.exception.TestRuntimeException;
import io.temp.board.controller.models.LoginUserParams;
import io.temp.board.service.AccountService;
import io.temp.board.service.TestService;

@RestController
@RequestMapping("/nonsec/test3")
public class Ex3Controller {
    @Autowired TestService testService;
    @Autowired AccountService accountService;

    @GetMapping("/runtime/0")
    private String runtimetest(){
        throw new Ex3TestRuntimeException("inside of Controller"); 
    }

    @GetMapping("/runtime/2")
    private String runtimeInsideServiceTest(){
        testService.throwRuntimeException();
        return "whoa";
    }

    @GetMapping("/runtime/3")
    private String customRuntimeInsideServiceTest(){
        testService.throwTestRuntimeException();
        return "whoa";
    }

    @GetMapping("/nonruntime")
    private String testNonRuntime(){
        try{
            throw new Ex3TestException("ㅡㅇ에");
        }catch(Exception e){
            
        }
        return "whoa";

    }

    @GetMapping("/jpa")
    private String jpaTest(){
        accountService.login(new LoginUserParams());
        return "whoa";
    }
}
