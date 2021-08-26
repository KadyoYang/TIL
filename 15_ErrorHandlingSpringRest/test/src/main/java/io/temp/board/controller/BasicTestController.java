package io.temp.board.controller;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.temp.board.controller.exception.TestRuntimeException;
import io.temp.board.controller.models.LoginUserParams;
import io.temp.board.service.AccountService;
import io.temp.board.service.TestService;


@RestController
@RequestMapping("/nonsec/test0")
public class BasicTestController {
    @Autowired TestService testService;
    @Autowired AccountService accountService;

    @GetMapping("/runtime/0")
    private String runtimetest(){
        throw new RuntimeException("inside of Controller"); 
    }

    @GetMapping("/runtime/1")
    private String customRuntimeTest(){
        throw new TestRuntimeException("inside of Controller");
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
            testService.throwException();
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
