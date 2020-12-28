package com.jpabook.jpashop.oauth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
public class AController {
    
    @RequestMapping(value="/test", method=RequestMethod.GET)
    public String requestMethodName() {
        log.info("test");
        return "home";
    }
    
}
