package com.jpabook.jpashop.controller;

import javax.servlet.http.HttpServletRequest;

import com.jpabook.jpashop.security.AccountUserDetailServiceImpl;
import com.jpabook.jpashop.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class TestController {
    /** 회원추가 메소드만 사용 */
    @Autowired AccountService accountService;

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
    @RequestMapping(value="/signup/proc", method=RequestMethod.POST)
    public String doSignup(HttpServletRequest request) {
        log.info("/signup/proc");
        String email = request.getParameter("email");
        String password = request.getParameter("pw");
        String role = request.getParameter("role");
        
        log.info("id : " + email);
        log.info("pw : " + password);
        log.info("createAccount start");
        accountService.createAccount(email, password, role);
        log.info("createAccount end done");

        return "redirect:/home";
    }

    @RequestMapping(value="/welcome", method=RequestMethod.GET)
    public String getWelcome() {
        return "welcome";
    }

    @RequestMapping(value="/admin", method=RequestMethod.GET)
    public String getAdminPage(){
        return "admin";
    }

    
}
