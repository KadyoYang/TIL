package org.gunchan.tacomo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.gunchan.tacomo.controller.domain.LoginDTO;
import org.gunchan.tacomo.controller.domain.PostDTO;
import org.gunchan.tacomo.controller.domain.SignupDTO;
import org.gunchan.tacomo.model.TestPost;
import org.gunchan.tacomo.model.TestUser;
import org.gunchan.tacomo.service.BoardService;
import org.gunchan.tacomo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TestController {
    
    // @Autowired
    // SampleAccountService sampleAccountService;
    @Autowired BoardService boardService;
    @Autowired UserService userService;

    // 유저 리스트

    @GetMapping("/rest/user")
    public List<TestUser> userList(){
        return userService.getUserList();
    }

    // 회원가입
    @PutMapping("/rest/user")
    public boolean signup(@RequestBody SignupDTO signupDTO) {
        return userService.signup(signupDTO.getEmail(), signupDTO.getPassword());
    }

    // 로그인
    @PostMapping("/rest/user")
    public boolean login(@RequestBody LoginDTO loginDTO){
        return userService.login(loginDTO.getEmail(), loginDTO.getPassword());

    }

    // 게시글 리스트
    @GetMapping("/rest/post")
    public List<TestPost> getPostList(){
        return boardService.getPostList();
    }

    // 게시글 게시
    @PostMapping("/rest/post")
    public void addPost(@RequestBody PostDTO postDTO){
        boardService.addPost(postDTO.getTitle());
    }



    

    
    
}
