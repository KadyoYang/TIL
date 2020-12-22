package com.jpabook.jpashop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class UserController {

    @RequestMapping(value="/", method=RequestMethod.GET)
    public String getHomedef() {
        return "home";
    }
    @RequestMapping(value="/home", method=RequestMethod.GET)
    public String getHome() {
        return "home";
    }
    

    @RequestMapping(value="/login", method=RequestMethod.GET)
    public String getSignin() {
        return "signin";
    }

    @RequestMapping(value="/signup", method=RequestMethod.GET)
    public String getSignup() {
        return "signup";
    }

    @RequestMapping(value="/welcome", method=RequestMethod.GET)
    public String getWelcome() {
        return "welcome";
    }

    
}
