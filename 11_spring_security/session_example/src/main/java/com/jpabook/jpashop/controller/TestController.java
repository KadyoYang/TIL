package com.jpabook.jpashop.controller;

import javax.servlet.http.HttpServletRequest;

import com.jpabook.jpashop.security.AccountUserDetailServiceImpl;
import com.jpabook.jpashop.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    // 컨트롤러로 선언된 Bean 객체에서는 다음과 같이도가능
    //매개변수  Principal principal 로 바로 가져올수있음
    // Authentication 도 동일
    // 또는 @AuthenticationPrincipal CustomUser customUser 도 가능 (단 CustomUser는 UserDetails를 구현해야함)
    @RequestMapping(value="/", method=RequestMethod.GET)
    public String getHomedef() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null){
            log.info("authentication null");
        }else{
            // Principal에 
            log.info("authentication is not null");
            log.info(authentication.getPrincipal().toString());
            // log.info(authentication.getCredentials().toString());
            log.info(authentication.getName().toString());
            log.info(authentication.getAuthorities().toString());
            log.info(authentication.getDetails().toString()); // 원격지 주소같은거
        }
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
