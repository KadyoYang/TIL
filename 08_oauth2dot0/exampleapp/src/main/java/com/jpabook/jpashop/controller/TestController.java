package com.jpabook.jpashop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class TestController {
    
    @RequestMapping(value="/", method=RequestMethod.GET)
    public String getHomePage() {
        log.info("home");
        return "home";
    }


    @RequestMapping(value="/login", method=RequestMethod.GET)
    public String getLoginPage() {
        log.info("login");
        return "login";
    }
    
}
