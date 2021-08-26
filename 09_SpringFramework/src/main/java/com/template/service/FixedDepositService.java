package com.template.service;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Session;
import javax.jms.TextMessage;

import com.template.dto.FixedDepositDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FixedDepositService {

    // o.s.JmsTemplate를 사용하면 저수준 JMS api를 신경쓰지않아도된다
    // factory에서 커넥션을 커넥션에서 세션을 만드는것을 알아서 해준다
    // 예외도 알아서 해준다
    // 스프링이 더 추상화해준 JmsMessagingTemplate를 사용해보자
    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;

    @Transactional("jmsTxManager")
    public void createFixedDeposit(final FixedDepositDTO fixedDepositDTO) throws Exception{
        /* jmsTemplate.send("emailQueueDestination", new MessageCreator(){
			@Override
			public Message createMessage(Session session) throws JMSException {
                TextMessage textMessage = session.createTextMessage();
                textMessage.setText(fixedDepositDTO.getEmail());
				return textMessage;
			}   
        }); */

        jmsMessagingTemplate.send("emailQueueDestination", 
        MessageBuilder.withPayload(fixedDepositDTO.getEmail()).build()
        );
      
        // JmsTemplate에 설정된 defualt 목적지로 전달된다
        // which is fixedDepositDestination
/*         jmsTemplate.send(new MessageCreator(){
			@Override
			public Message createMessage(Session session) throws JMSException {
				ObjectMessage objectMessage = session.createObjectMessage();
                objectMessage.setObject(fixedDepositDTO);
				return objectMessage;
			}
        }); */
        
        jmsMessagingTemplate.send(MessageBuilder.withPayload(fixedDepositDTO).build());
    }
}
