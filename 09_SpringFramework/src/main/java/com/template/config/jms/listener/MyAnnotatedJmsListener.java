package com.template.config.jms.listener;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.template.dto.FixedDepositDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MyAnnotatedJmsListener {
    // transient는 직렬화에서 해당 필드를 제외할때 쓰는 예약어
    @Autowired
    transient JavaMailSender mailSender;
    @Autowired
    @Qualifier("requestReceivedTemplate")
    private transient SimpleMailMessage simpleMailMessage;

    private void sendMail() {
        mailSender.send(simpleMailMessage);
    }

    @JmsListener(destination = "emailQueueDestination")
    public void processEmailMessage(Message<String> message) {
        log.info("mailmailmailmail");
        simpleMailMessage.setTo(message.getPayload());
        sendMail();
    }

    @JmsListener(destination = "fixedDepositDestination")
    public void processFixedDeposit(Message<FixedDepositDTO> message) throws MessagingException {
        log.info("deposit1111111");
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(message.getPayload().getEmail());
        mimeMessageHelper.setSubject("deposit");
        mimeMessageHelper.setText(simpleMailMessage.getText());
        
        mailSender.send(mimeMessage);

        log.info(message.getPayload().toString());
    }



}
