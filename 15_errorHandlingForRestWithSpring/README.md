# Error Handling for REST with Spring [ko]
> source : https://www.baeldung.com/exception-handling-for-rest-with-spring - by Eugen Paraschiv

### 개요 
```
이 글에서는 어떻게 REST with Spring의 에러핸들링을 구현하는지에 대해서 알려줄것이다
그리고 스프링 버전업에 따라서 어떠한 방법들이 소개되었는지도 알려줄거다

스프링 3.2버전 전에는 스프링 MVC app에서의 예외 핸들링에 대한 대표적으로 두개의 접근법이 있었다.
'HandlerExceptionResolver' 와 '@ExceptionHandler' annotation 이다. 이것들 전부 확실한 단점이 있다.

스프링 3.2버전 후부터는 위에 소개된 두개 방법의 한계점을 Address 하기 위해서,
그리고 전체 어플리케이션을 포함하는 통합된 예외 핸들링을 장려하기 위해서,
'@ControllerAdvice' 어노테이션이 소개되었다.

그리고 지금 스프링 5버전에서는 REST API에서의 빠른 기본적인 에러 핸들링을 위한 방법인 'ResponseStatusException' class가 소개되었다.

위에 소개된 모든 것들은 공통적으로 한가지를 한다. 관심사 분리를 잘 해결해 준다.
앱은 특정 상황의 실패를 알리기 위해서 예외를 던질 수 있다. 이 예외는 개별적으로 핸들된다.

```

### Solution 1: the Controller-Level @ExceptionHandler
```java
/**
* 첫번째 솔루션은 @Controller 단에서 작동한다
* 우리는 예외를 핸들하기 위해서 메소드를 정의하고 그 메소드에 @ExceptionHandler 어노테이션을 붙인다.
*/
@Controller
public class FooController{
    // ...
    @ExceptionHandler({CustomException.class, CustomException2.class})
    public void handleException(){
        // ...
    }
}
```
```
이 해결법에는 큰 약점 하나가 있는데, @ExceptionHandler 로 어노테이트 된 method는 그 해당 특정한 Controller에서만 작동한다는것이다. (글로벌하게 어플리케이션 전반에서 작동을 안함)
이걸 해결하자고 모든 컨트롤러에 다 집어넣는것은 또 general exception handling mechanism 에 부합하지를 않는다

또는 @ExceptionHandler를 메소드를 가진 기반클래스를 상속받는 방법이 있는데, 만약에 자식컨트롤러가 다른클래스를 상속받거나 jar 안에 있는 클래스를 상속받는경우에는 또 불가능하거나 귀찮은 일이 될 수 있다.

다음에 소개할 HandlerExceptionResolver는 위에서 봤던 문제 '글로벌 불가'와 'Controller에 변화를 준다'를 해결해준다.
```


### Solution 2: the HandlerExceptionResolver
```
두번째 방법은 HandlerExceptionResolver를 정의하는 것이다. 이것은 어플리케이션에 의해 던져지는 예외들을 잘 처리할 것이다.
또한 우리의 RESTAPI에 uniform(균일)한 예외 핸들링 메카니즘을 구현할 수 있도록 해줄 것이다.

커스텀 Resolver로 가기 전에 현재 이미 구현된 구현체를 보고 가자
```
* ExceptionHandlerExceptionResolver
    - 이 resovler는 spring3.1에서 소개되었으며 DispatcherServlet에서 기본적으로 활성화 되어있다. 
    - 최근에 발표된 @ExceptionHandler 동작 메카니즘의 코어 컴포넌트이다.
* DefaultHandlerExceptionResolver
    - 이 resolver는 spring3.0에서 소개되었으며 DispatcherServlet에서 기본적으로 활성화 되어있다.
    - 표준 Spring Exception 을 일치하는 4xx, 5xx 같은 Http Status Code 로 해준다.
    - http://static.springsource.org/spring/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-ann-rest-spring-mvc-exceptions
    - 하나 존재하는 한계가 있는데, 이 resolver는 response의 body에 다른 추가적인 정보를 안넣는다.
    - 특히 REST API 같은 경우에서 클라이언트로써는 status code 만으로는 충분하지않다.
    - response는 body를 가져야하고 그 body안에 부가 정보를 넣어서 그 실패에 대해 잘 전달해줘야한다.
    - 이 문제는 view resolution을 설정하거나 ModelAndView를 통해서 전달하는 방법이 있는데, 확실한 최적의 방법은 아니다. 
    - 이런 것들이 왜 Spring 3.2에서는 더 나은 옵션이 소개되었는지에 대한 이유다
* ResponseStatusExceptionResolver 
    - 이 resolver도 spring3.0에서 소개되었으면 기본적으로 DispatcherServlet에서 기본적으로 활성화 되어있다.
    ```java
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public class MyResourceNotFoundException extends RuntimeException{
        // method...
    }
    ```
    - 이 방법 또한 위에 소개했던 DefaultHandlerExceptionResolver와 같이 body가 여전히 null이란 한계를 가지고 있다.
* SimpleMappingExceptionResolver & (deprecated)AnnotationMethodHandlerExceptionResolver(instead use ExceptionHandlerExceptionResolver)
    - REST API 관련은 아니지만 SimpleMappingExceptionResolver는 exception class name으로 view name들을 map 하는 데에 쓰인다
    - @ExceptionHandler 어노테이션을 핸들하기위해서 나왔으나 deprecated되었고, 대신 ExceptionHandlerExceptionResolver가 쓰인다