https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket

* raw websocket
* websocket emulation through sockJS
* publish-subscribe messaging through STOMP as a sub-protocol over websocket


핸드쉐이크
request
upgrade : websocket
Connecti9o9n : upgrade 

reponse 200ok 대신에 이것이 오고 이 후에는 연결이 지속된다
upgrade : websocket
connection : upgrade

웹소켓 서버가 웹서버(예)nginx) 뒤에서 작동하고있으면 적절한 설정을 해서 websocket 요청을 웹소켓 서버로 보내야한다

빠른반응속도, 빈번한 통신, 많은 데이터를 써야하는 솔루션에는 websocket이 적당하다


#WebsocketHandler
웹소켓 서버를 만드는 일은 간단하게 WebSocketHandler를 구현하거나 또는 TextWebSocketHandler, BinaryWebSocketHandler를 상속받으면 된다
BinaryWebSocketHandler : binary message만 처리하는 WebSocketHandler를 구현하는 간편 클래스
TextWebSocketHandler : text message만 처리하는 WebSocketHandler를 구현하는 간편 클래스

```java
public class MyHandler extends TextWebSocketHandler{
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message){
		//...
	}
}
```

웹소켓 설정 Java로 해도되고, xml로 해도된다 
자바설정은 다음과 같음

```java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{
@Override
public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
registry.addHandler(myHandler(), "/myHandler");

@Bean
public WebSocketHandler myHandler(){
return new MyHandler();
}
}
```


# WebSocket Handshake
초기 HTTP Websoket 핸드쉐이크 요청을 커스터마이징 하는 방법으로 HandshakeInterceptor를 사용하는 방법이다
HandshakeInterceptor는 before메소드와 after메소드를 노출시킨다.
이런 interceptor로 핸드쉐이크를 배제하거나, 특정 값을 WebSocketSession에서 사용가능하게 할 수 있다.

```java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new MyHandler(), "/myHandler")
            .addInterceptors(new HttpSessionHandshakeInterceptor());
    }
}
```
또는 더 고급방법으로 DefaultHandshakeHandler를 상속해서 사용하는 방법이다. 이 방법은 WebSocket핸드쉐이크의 스텝스텝을 하는 것인데, 
클라이언트 오리진 검증, sub protocol 협상, 등등을 한다.
WebSocketHandlerDecorator로 WebSocketHandler의 추가적인 행동을 데코레이트 할 수 있다. 로깅이나 예외 처리 구현이 기본으로 제공된다 WebSocketJavaConfiguration에 

 
# Server Configuration
웹소켓 엔진은 메시지버퍼사이즈, 아이들 타임아웃, 등의 런타임 특성을 설정하는 설정셋을 제공한다
Tomcat, WildFly, GlassFish 같은 경우 다음과 같이 ServletServerContainerFactoryBean 을 추가해서 설정할 수 있다.
```java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(8192);
        container.setMaxBinaryMessageBufferSize(8192);
        return container;
    }

}
//  클라이언트사이드 웹소켓 설정은 XML(WebSocketContainerFactoryBean)쓰거나 Java(ContainerProvider.getWebSocketContainer())로 해야한다.
```


# Allowed Origins
스프링프레임워크 4.1.5부터 동일 오리진만 허가한다. 전체 허가나 origin 리스트로 설정해도된다.
* allow only same origin request(default)
* Allow a specified list of origins : http, https:// 등으로 시작해야하며, sockjs활성화시에 IFrame transport 는 비활성화된다. 그리고 이 결과로 IE6~9 지원 못한다.
* Alloww all origins : 이 모드를 키려면 *을 넣으면 된다.

```java
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/myHandler").setAllowedOrigins("https://mydomain.com");
    }

    @Bean
    public WebSocketHandler myHandler() {
        return new MyHandler();
    }
}

```



# SockJS Fallback
SockJs의 목표는 어플리케이션이 WebSocketAPI를 잘 사용하다가 뭐 중간에 프록시  서버에서 연결을 끊는다던지의 상황에서 
Http방식의 WebSocket통신을 에뮬레이트하는 방식으로 돌려서 계속 WebSocketAPI를 사용할수 있게하는거다,
어플리케이션 코드를 바꾸지 않고
sockjs는 sockjs프로토콜, sockjs client 라이브러리, sockjs 서버 구현체(spring-websocket에 포함되있음 스프링4.1부터는 클라이언트도 포함되있음)

모든 transport request는 다음과 같은 URL structure를 따른다
https://host:port/myApp/myEndpoint/{server-id}/{session-id}/{tranport}
server-id: 서버 클러스터 환경에서 요청을 라우팅할때 사용된다. 다른 경우에는 안쓰인다
session-id: sockJS 세션에 속하는 httpRequest를 연관시킴
transport : transport type을 지정 ex) websocket, xhr-streaming

Enabling SockJs
```java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/myHandler").withSockJS();
    }

    @Bean
    public WebSocketHandler myHandler() {
        return new MyHandler();
    }

}
```


