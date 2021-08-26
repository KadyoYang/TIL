package com.template.config.jms;

import java.util.ArrayList;
import java.util.List;

import org.apache.activemq.broker.BrokerService;
import org.apache.activemq.spring.ActiveMQConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.connection.CachingConnectionFactory;
import org.springframework.jms.connection.JmsTransactionManager;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.core.JmsTemplate;

@Configuration
@EnableJms
public class JmsConfig {
    
    //--corresponds to <amq:broker>
    /**
     * ActiveMQ 브로커를 내장 모드에서 실행
     * 아니면 따로 서버로 빼던가
     * @return
     * @throws Exception
     */
    @Bean
	public BrokerService brokerService() throws Exception {
/* 		BrokerService broker = new BrokerService();
		broker.addConnector("tcp://localhost:61616");
		broker.start(); */

        BrokerService brokerService = new BrokerService();
        brokerService.setPersistent(false);
        brokerService.setUseJmx(false);
        //brokerService.addConnector("vm://localhost:0");
        brokerService.addConnector("tcp://127.0.0.1:61616");
        // brokerService.setBrokerName("broker");
        brokerService.setUseShutdownHook(false);

		brokerService.start();

        return brokerService;
        
	}

    // ########################################################

    
/**
 * 내장 activeMQ인스턴스에 대한 연결을 생성할 때 사용할 JMSConnectionFactory 인스턴스를 만든다
 * @return
 */
    //--corresponds to <amq:connectionFactory>
	@Bean
	public ActiveMQConnectionFactory connectionFactory() {
		ActiveMQConnectionFactory activeMQConnectionFactory = new ActiveMQConnectionFactory();
		activeMQConnectionFactory.setBrokerURL("tcp://127.0.0.1:61616");
        
        
        // 명시한 패키지에 속하는 객체만 JMS ObjectMessage를 통해 교환가능
		List<String> trustedPackages = new ArrayList<>();
		trustedPackages.add("com.template.domain");
		trustedPackages.add("com.template.dto");
		trustedPackages.add("java.util");
		activeMQConnectionFactory.setTrustedPackages(trustedPackages);

		return activeMQConnectionFactory;
	}

    /**
     * JMSConnectionFactory에 대한 어댑터 JMS Session, MessageProducer, MessageConsumer 인스턴스를 캐시하는 추가 기능을 제공
     * @param activeMQConnectionFactory
     * @return
     */
/*     @Bean
	public CachingConnectionFactory cachingConnectionFactory(ActiveMQConnectionFactory activeMQConnectionFactory) {
		CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory();
        // 바로 위에 볼수있는 ActiveMQConnectionFactory 빈을 매개변수로 받는다
		cachingConnectionFactory.setTargetConnectionFactory(activeMQConnectionFactory);
		return cachingConnectionFactory;
	}
 */


    //--corresponds to <jms:listener-container>
	@Bean
	public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(ActiveMQConnectionFactory cachingConnectionFactory, JmsTransactionManager transactionManager) {
		DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
		factory.setConnectionFactory(cachingConnectionFactory);
		factory.setTransactionManager(transactionManager);

		// pub-sub 일때 리스너는 다음 설정해야함
		// factory.setClientId("brokerTestClientId");
		// factory.setSubscriptionDurable(true);
		// factory.setPubSubDomain(true);

		return factory;
	}

	@Bean(name = "jmsTxManager")
	public JmsTransactionManager jmsTransactionManager(ActiveMQConnectionFactory cachingConnectionFactory) {
		JmsTransactionManager transactionManager = new JmsTransactionManager();
		transactionManager.setConnectionFactory(cachingConnectionFactory);
		return transactionManager;
	}

	@Bean
	public JmsMessagingTemplate jmsMessagingTemplate(ActiveMQConnectionFactory cachingConnectionFactory) {
		JmsTemplate jmsTemplate = new JmsTemplate(cachingConnectionFactory);
		// jmsTemplate.setPubSubDomain(true);// queue가 아닌 pubsub(topic) 으로 

		JmsMessagingTemplate jmsMessagingTemplate = new JmsMessagingTemplate(jmsTemplate);
		jmsMessagingTemplate.setDefaultDestinationName("fixedDepositDestination");
		return jmsMessagingTemplate;
	}


}
