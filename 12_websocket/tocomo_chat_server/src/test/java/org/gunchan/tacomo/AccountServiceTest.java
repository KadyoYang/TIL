package org.gunchan.tacomo;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = "classpath:META-INF/appConfig.xml")
public class AccountServiceTest {
    // @Autowired SampleAccountService sampleAccountService;

   /*  @Test
    public void 유저_회원가입(){
        Long id = sampleAccountService.signup("test1@test.com", "qwer1234", "nickname");
        SampleAccount account = sampleAccountService.getAccountInfo(id);

        assertEquals("test1@test.com", account.getEmail());
    }

    @Test(expected = IllegalStateException.class)
    public void 유저_중복이메일_가입_예외(){
        sampleAccountService.signup("test1@test.com", "qwer1234", "nickname");
        
        sampleAccountService.signup("test1@test.com", "qwer1234", "nickname");
    }

    @Test
    public void 유저_패스워드변경(){
        String cp = "qwer1234";
        String np = "aaaabbbb";
        sampleAccountService.signup("test@test.com", cp, "nickname");
        sampleAccountService.changepassword("test@test.com", cp, np);
    
        assertEquals(true, sampleAccountService.simpleAuthentication("test@test.com", np));
    } */
}
