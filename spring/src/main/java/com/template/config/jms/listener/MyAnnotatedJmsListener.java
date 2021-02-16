package com.template.config.jms.listener;


import com.template.dto.FixedDepositDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MyAnnotatedJmsListener {
    // transient는 직렬화에서 해당 필드를 제외할때 쓰는 예약어
    // 도대체 필자가왜 여기에 썼는지 이해가 안간다
    // @Autowired transient MailSender mailSender;

    @JmsListener(destination = "emailQueueDestination")
    public void processEmailMessage(Message<String> message){
        log.info("mailmailmailmail");

    }

    @JmsListener(destination = "fixedDepositDestination")
    public void processFixedDeposit(Message<FixedDepositDTO> message){
        log.info("deposit1111111");
        log.info(message.getPayload().toString());
    }



}
