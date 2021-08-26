package io.temp.board.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.temp.board.config.security.constants.AuthConstants;
import io.temp.board.controller.models.AddPostParams;
import io.temp.board.controller.models.LoginUserParams;
import io.temp.board.controller.models.SignupUserParams;
import io.temp.board.domain.TestPost;
import io.temp.board.domain.types.AccountRoleType;
import io.temp.board.service.AccountService;
import io.temp.board.service.PostService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class TestController {
    protected static final String SIGNUP_ROUTE = "/api/user/signup";
    protected static final String LOGIN_ROUTE = "/api/user/login";
    protected static final String BOARD_ROUTE = "/api/board";
    protected static final String SPECIFIC_POST_ROUTE = "/api/board/{number}";
    protected static final String QR_TEST_ROUTE = "/api/qr";
    

    @Autowired
    private AccountService accountService;

    @Autowired
    private PostService postService;

    @GetMapping("/")
    public Boolean test(){
        return true;
    }

    // 회원가입
    @PostMapping(SIGNUP_ROUTE)
    public Boolean signup(@Valid @RequestBody SignupUserParams user, Errors errors){
        if(errors.hasErrors()) {
            for(ObjectError objectError : errors.getAllErrors()){
                log.info(objectError.toString());
            }
            return false;
        }

        
        return accountService.signup(user);
    }

    // 로그인
    @PostMapping(LOGIN_ROUTE)
    public Boolean login(HttpServletResponse response, @Valid @RequestBody LoginUserParams user, Errors errors){
        if(errors.hasErrors()) {
            for(ObjectError objectError : errors.getAllErrors()){
                log.info(objectError.toString());
            }
            return false;
        }

        String token = accountService.login(user);

        if(token == null){
            return false;
        }else{
            response.addHeader(AuthConstants.AUTH_HEADER, AuthConstants.TOKEN_TYPE + " " + token);
            // response.sendRedirect("/welcome");
            response.addHeader("Access-Control-Expose-Headers", AuthConstants.AUTH_HEADER); 
        }
        return true;
    }

    // 글 목록
    @GetMapping(BOARD_ROUTE)
    public List<TestPost> getPosts(){
        return postService.getPostList();
    }

    // 글 등록
    @PostMapping(BOARD_ROUTE)
    public Boolean addPost(@Valid @RequestBody AddPostParams post, Errors errors){
        if(errors.hasErrors()) return false;
        return postService.addPost(post);
    }

    // 글 상세보기
    @GetMapping(SPECIFIC_POST_ROUTE)
    public TestPost getPostDetail(@PathVariable("number") Long number){
        return postService.getOnePost(number);
    }

    // 큐알 전송 및 테스트
    @PostMapping(QR_TEST_ROUTE)
    public String testQR(@NotEmpty @RequestBody String qr, Errors errors){
        if(errors.hasErrors()) return "qr can not be null";
        return qr;
    }

}
