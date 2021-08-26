# Error Handling for REST with Spring [ko]
> source : https://www.baeldung.com/exception-handling-for-rest-with-spring - by Eugen Paraschiv
> 추가 자료 
> https://www.baeldung.com/rest-api-error-handling-best-practices
> http sttaus code 다이어그램 
> https://stackoverflow.com/questions/942951/rest-api-error-return-good-practices

## 개요 
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

## Solution 1: the Controller-Level @ExceptionHandler
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


## Solution 2: the HandlerExceptionResolver
```
두번째 방법은 HandlerExceptionResolver를 정의하는 것이다. 이것은 어플리케이션에 의해 던져지는 예외들을 잘 처리할 것이다.
또한 우리의 RESTAPI에 uniform(균일)한 예외 핸들링 메카니즘을 구현할 수 있도록 해줄 것이다.

커스텀 Resolver로 가기 전에 현재 이미 구현된 구현체를 보고 가자
```
* #### ExceptionHandlerExceptionResolver
    - 이 resovler는 spring3.1에서 소개되었으며 DispatcherServlet에서 기본적으로 활성화 되어있다. 
    - 최근에 발표된 @ExceptionHandler 동작 메카니즘의 코어 컴포넌트이다.
* #### DefaultHandlerExceptionResolver
    - 이 resolver는 spring3.0에서 소개되었으며 DispatcherServlet에서 기본적으로 활성화 되어있다.
    - 표준 Spring Exception 을 일치하는 4xx, 5xx 같은 Http Status Code 로 해준다.
    - http://static.springsource.org/spring/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-ann-rest-spring-mvc-exceptions
    - 하나 존재하는 한계가 있는데, 이 resolver는 response의 body에 다른 추가적인 정보를 안넣는다.
    - 특히 REST API 같은 경우에서 클라이언트로써는 status code 만으로는 충분하지않다.
    - response는 body를 가져야하고 그 body안에 부가 정보를 넣어서 그 실패에 대해 잘 전달해줘야한다.
    - 이 문제는 view resolution을 설정하거나 ModelAndView를 통해서 전달하는 방법이 있는데, 확실한 최적의 방법은 아니다. 
    - 이런 것들이 왜 Spring 3.2에서는 더 나은 옵션이 소개되었는지에 대한 이유다
* #### ResponseStatusExceptionResolver 
    - 이 resolver도 spring3.0에서 소개되었으면 기본적으로 DispatcherServlet에서 기본적으로 활성화 되어있다.
    ```java
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public class MyResourceNotFoundException extends RuntimeException{
        // method...
    }
    ```
    - 이 방법 또한 위에 소개했던 DefaultHandlerExceptionResolver와 같이 body가 여전히 null이란 한계를 가지고 있다.
* #### SimpleMappingExceptionResolver & (deprecated)AnnotationMethodHandlerExceptionResolver(instead use ExceptionHandlerExceptionResolver)
    - REST API 관련은 아니지만 SimpleMappingExceptionResolver는 exception class name으로 view name들을 map 하는 데에 쓰인다
    - @ExceptionHandler 어노테이션을 핸들하기위해서 나왔으나 deprecated되었고, 대신 ExceptionHandlerExceptionResolver가 쓰인다
* #### 커스텀 HandlerExceptionResolver
    - DefaultHandlerExceptionResolver와 ResposeStatusExceptionResolver의 조합하는 방법으로 Spring REST API 에러 핸들링에 나름 좋은 방안이 될 수 있다.
    - 단점은 위에 서술했듯이 response의 body에 대한 컨트롤을 할 수가 없다는 것이다.
    - 이상적으로 우리는 클라이언트가 요청한 포맷대로(Accept 헤더로) JSON이나 XML로 아웃풋을 주고 싶다.
    - 다음은 새로운 우리의 커스텀 Exception Resolver다 
    ```java
    @Component
    public class CustomRestResponseStatusExceptionResolver extends AbstractHandlerExceptionResolver {
        @Override
        protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex){
            try{
                if(ex instanceof IllegalArgumentException){
                    return handleIllegalArgument((IllegalArgumentException)ex, response, handler);
                }
                ...
            } catch(Exception handlerException){
                logger.warn("Handling of [" + ex.getClass().getName() + "] resulted in Exception", handlerException);
            }
            return null;
        }

        private ModelAndView handleIllegalArgument(IllegalArgumentException ex, HttpServletRespnose respones) throws IOException{
            response.sendError(HttpServletResponse.SC_CONFLICT);
            String accept = request.getHeader(HttpHeaders.ACCEPT);
            ...
            return new ModelAndView();
        }
    }
    ```
    - 위 코드에서 주목해야할 하나의 디테일은 request 에 직접 접근한다는 것이다. 따라서 request안에 있는 클라이언트 Accept헤더에 접근할 수 있다.
    - 예를 들어 클라이언트가 application/json으로 요청을 했을때, 에러발생하면 에러 body에 application/json으로 엔코딩에서 넣어서 리턴할 수 있다.
    - 또 다른 중요한 디테일은 우리가 ModelAndView(response의 body)를 리턴한다는 것이다. 이것은 우리에게 필요한 무엇이든 할 수 있게 해준다.
    - 이러한 접근법은 REST API 에러 핸들링에 있어 일관적이고 쉽게 설정가능한 메카니즘이다.
    - 하지만 이 방법도 한계가 있는데, low-level HttpServletResponse 와 상호작용한다는 것과, 
    - ModelAndView를 쓰는 옛날 MVC 모델에 적합한 방법이라는 것이다.
    - 아직 더 향상시켜야할 부분이 더 남아있다.


## Solution 3: @ControllerAdvice 어노테이션
```
Spring 3.2 는 @ControllerAdvice 어노테이션으로 Global @ExceptionHandler 를 지원한다.
이것은 오래된 MVC 모델을 벗어나고, @ExceptionHandler의 타입 안정성과 유연함과 함께 ResponseEntity를 사용하는 메카니즘을 가능하게 한다.
```
```java
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {IllegalArgumentException.class, IllegalStateException.class})
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest reuqest){
        String bodyOfResponse = "This should be application specific";
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }
}
```
```
@ControllerAdvice 어노테이션은 흩어진 여러개의 @ExceptionHandler들을 하나의 Global한 에러 핸들링 컴포넌트로 consolidate(통합)할 수 있게 해준다.
실제 메카니즘은 극도로 쉽고 또한 굉장히 유연하다
    * response의 body뿐만 아니라 status code에 대한 full control을 우리에게 준다.
    * 같이 처리될수 있도록 동일한 메소드에대한 여러개의 에러 매핑을 제공한다.
    * 최신 RESTful ResponseEntity response의 좋은 사용을 만들게 한다
만약에 body로 return 하고싶으면 @RestControllerAdvice 로 대신 사용하면 된다. (@RespnseBody + @ControllerAdvice)

한가지 꼭 머릿속에 가지고 있어야하는것이 @ExceptionHandler 어노테이션 안에 넣어놓은 Exception타입과 메소드 아규먼트의 타입이 맞아야한다.
만약 매치안되게 했다고 치자, 컴파일타임에도 알 수 없고, 스프링도 모른다.
그런데 만약에 그 Exception이 runtime에 던져졌을때, 예외 resolving 메카니즘은 다음 에러와 함께 실패할거다
java.lang.IllegalStateException: No suitable resolver for argument [0] [type=...]
HandlerMehtod details: ...
```


## Soltuion 4: ResponseStatusException (Spring 5 and Above)
```
Spring 5은 ResponseStatusException class를 소개했다.
HttpStatus, reason(선택적), cause(선택적)를 제공하는 ResponseStatusException.class 의 인스턴스를 생성할 수 있다.
```
```java
@GetMapping(value="/{id}")
public Foo FindById(@PathVariable("id") Long id, HttpServletResponse response){
    try{
        Foo resourceById = RestPreconditions.checkFound(service.findOne(id));

        eventPublisher.publishEvent(new SingleResourceRetrievedEvent(this, response));
        return resourceById;
    }catch(MyResourceNotFoundException exc){
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Foo Not Found", exc);
    }
}
```
```
ResponseStatusException을 사용함으로써 얻는 장점은 무엇일까!
1. 프로토타이핑에 최적이다. 꽤 빠르게 기본적인 솔루션을 구현할 수 있다.
2. 하나의 타입에 여러개의 Status코드가 가능, 하나의 예외타입으로 여러개의 다른 response로 보낼 수 있다. 타이트한 결합도를 @ExceptionHandler에 비해 낮다.
3. 굳이 많은 커스텀 Exception class를 만들지 않아도 된다.
4. 예외 핸들링데 더 많은 컨트롤을 가질 수 있다. 프로그램적으로 예외가 만들어질수 있기 때문에

반대로 단점은 무엇일까
1. 통합된 예외 핸들링의 방법이 없다. @ControllerAdvice에 비해 어플리케이션 글로벌한 컨벤션같은거를 하기가 어렵다. 
2. 여러개의 Controller내부에서 똑같은 코드를 여러번 적는 수고를 해야할때가 많이 생길 수 있다.

알아야할게, 서로 다른 접근법을 하나의 어플리케이션에서 혼합해서 사용하는 것이 가능하다는 것을 알고있어야한다. 
예를 들어 전역적인 @ControllerAdvice를 구현하고 또한 ResponseStatusException을 지역적으로 구현할 수 있다.
하지만 이때 조심해야한다. 만약에 똑같은 Exception이 동시에 여러 방법으로 핸들되면, 예상치 못한 행동을 볼 수 있다.
그래서 가능한 컨벤션은 하나의 특정한 Exception을 하나의 방법으로만 핸들하는 것이다.
더 많은 자세한 설명과 예제는 다음 링크 : https://www.baeldung.com/spring-response-status-exception
```

## 번외 : Handle the Access Denied in Spring Security
```
접근 거절은 인증과 인가과정에서 충분한 권한을 가지고 있지 않은 자원에 액세스할때 일어난다
```
#### MVC : 커스텀 Error Page
```
먼저 MVC 스타일의 솔루션을 보고 Access Dinied 에러페이지를 어떻게 커스터마이징을 하는지 보자
XML 스타일과 Java 스타일이 있는데 Java 스타일만 일단 보자(XML 스타일은 원글 보세요)
```
```java
@Override
protected void configure(HttpSecurity http) throws Exception{
    http.authorizeRequests()
        .antMatchers("/admin/*").hasAnyRole("ROLE_ADMIN")
        ...
        .and()
        .exceptionHandling().accessDeniedPage("/my-error-page");
    // 유저가 충분한 권한 없이 리소스에 접근할시에 /my-error-page 로 redirect 된다.
}
```
#### 커스텀 AccessDeniedHandler
``` 
그러면 어떻게 커스텀 AccessDeniedHandler를 작성하는지 보자
```
```java
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler{

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException ex)throws IOException, ServletException{
        response.sendRedirect("/my-error-page");
    }
    // security config에 exceptionHandling().accessDeniedHandler( 이 빈 넣으면 된다);
    // response도 잘 우리가 커스텀하게 꾸려서 응답할 수 있다.
}
```

#### REST and Method-Level Security
```
마지막으로 메소드레벨 시큐리티(@PreAuthorize, @PostAuthorize, 글고 @Secure) Access Denied를 핸들하는 법을 보자
AccessDeniedException 을 처리하기 위해서 위에서 이미 논의했던 Global Exception 핸들링 메카니즘을 사용할 것이다.
```
```java 
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler{

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<Object> handleAccessDeniedException(Exception ex, WebRequest request){
        return new ResponseEntity<Object>("Access denied message here", new HttpHeaders(), HttpStatus.FORBIDDEN);
    }
    // ...
}
```


## Spring Boot Support
> 생략

## 결론
```
spring REST API 에서의 예외 핸들링에 대한 다양한 방법을 알아보았다.
옛날방식부터해서 요즘방식 (3.2 4.x 5.x)
```

> 흠 뭘 써야할지 고민된다...쭈압..
