package com.template.controller;

import java.util.HashMap;
import java.util.Map;

import com.template.domain.SampleAccount;
import com.template.domain.types.AccountRoleType;
import com.template.service.SampleAccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class TestController {
    
    @Autowired
    SampleAccountService sampleAccountService;

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @ResponseBody
    @GetMapping("/signup")
    public SampleAccount singup(@RequestParam("email")String email){
        Long id = sampleAccountService.signup(email, "qwer1234", "testNickname");

        return sampleAccountService.getAccountInfo(id);
    }

    @ResponseBody
    @GetMapping("/test")
    public Map<String, Object> test() {
        SampleAccount testAccount = new SampleAccount();
        testAccount.setEmail("email");
        testAccount.setId((long)9999);
        testAccount.setNickname("nick~");
        testAccount.setPassword("password");
        testAccount.setRoleType(AccountRoleType.ROLE_ADMIN);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("account", testAccount);
        
        return map;
    }




    
    
}
