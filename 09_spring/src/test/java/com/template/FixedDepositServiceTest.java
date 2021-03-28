package com.template;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Calendar;

import com.template.dto.FixedDepositDTO;
import com.template.service.FixedDepositService;
import com.template.service.SampleAccountService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

@Transactional("transactionManager")
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = "classpath:META-INF/appConfig.xml")
public class FixedDepositServiceTest {
    @Autowired FixedDepositService fixedDepositService;

    @Test
    public void ActiveMQ테스트() throws Exception {
        FixedDepositDTO fd = new FixedDepositDTO();
        
        fd.setActive("active");
        fd.setBankAccountId(4);
        fd.setEmail("mrriey00@naver.com");
        fd.setFdAmount(40);
        fd.setFdCreationDate(Calendar.getInstance().getTime());
        fd.setFixedDepositId(4);
        fd.setTenure(50);

        fixedDepositService.createFixedDeposit(fd);
        assertTrue("message", true);
    }


}
