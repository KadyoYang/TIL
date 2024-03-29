# spring

# 실행 
* 필요사항
    - Openjdk8
    - Maven 
    - Docker
    - Docker-compose
    - WSL2(windows 10 환경일때)
* 실행 순서
```shell
mvn package -f .\ -Dmaven.test.skip=true
docker-compose -f docker-compose-dev.yml up -d 
docker-compose -f docker-compose-production.yml up -d
```





# spring 키워드
* 빈 주입
    - Autowired, Qualifier
    - Inject, Named

---

* 값 유효성 검사
    - Validator 인터페이스
    - JSR380(빈 검증 2.0)
        ```java
        @NotNull, @Min, @Max, @NotBlank, @Size
        ```
    - 스프링의 JSR380지원 LocalValidatorFactoryBean
        ```java
        @Autowired private Validator validator;
        // org.springframework.validation.beanvalidation.LocalValidatorFactoryBean
        // jsr380의 validator, validatorFactory인터페이스 구현하는 동시에, 스프링 Validator인터페이스도 구현한다

        // 스프링 validator
        BeanPropertyBindingResult = bindingResult = new BeanPropertyBindingResult(대상, "Errors");
        validator.validate(대상, bindingResult);
        if(bindingResult.getErrorCount() > 0){
            logger.error("Error were found");
        }else{
            대상.작업
        }

        // jsr380 api
        Set<ConstraintViolation<대상.class>> violations = validator.validate(대상);
        Iterator<ConstraintViolation<대상.class>> iter = violations.iterator();
        if(itr.hasNext()) logger.error("Error were found");
        else 대상.작업
        ```
    - 메서드 검증
        ```java
        // 메서드의 인수와 반환값을 검증
        // org.springframework.validation.beanvalidation.MethodValidationPostProcessor

        //@Validated가 설정된 빈 클래스를 검색해 jsr380 제약 사항 애너테이션을 사용해 검증 지원한다

        @Validated
        public interface CustomerRequestService{
            @Future // 반환값은 미래날짜여야한다.
            Calendar submitRequest(@NotBlank String type, @Size(min=20, max=100) String description, @Past Calendar accountOpeningTime);
        }
        ```

--- 

* 프로파일
    - 빈 정의 프로파일
    - 빈 집합과 프로파일을 연결시켜서 환경에 따라 다른 빈을 사용하고싶을때 사용
    - ex) 개발환경에는 내장db, 프로덕션에서는 독립db
    - spring.profiles.active 프로퍼티 값으로 프로파일 이름을 설정
    - java 기반 config일때는 설정클래스또는 메소드에 @Profile({"dev", "~~"}) 등으로 프로파일 설정이 가능
    - 톰캣사용시 JVM 옵션을 통해 프로필 설정 가능 ex) -Dspring.profiles.active=dev 
    - 또는 web.xml에서 스위칭 ex) <context-param><param-name>spring.profiles.active</param-name><param-value>dev</param-value></context-param> 
        
--- 

* 스프링으로 데이터베이스 상호작용
    - 스프링은 JDBC 위에 추상계층을 추가해 데이터베이스와 상호작용을 편리하게 해줌
    - 메서드 이름으로 동작하게 JpaRepository<?,?>

---

* JMS (Java Message Service)
    - 자바 프로그램이 네트워크를 통해 데이터를 송수신하는 자바 API
    - JMS API는 두 개 혹은 그 이상의 클라이언트 간 메시지 통신을 위한 자바 메시지 기반 미들웨어 API이다
    - 애플리케이션 컴포넌트끼리 메시지를 생성, 송/수신, 읽기 기능을 제공하는 메시징 표준
    - 분산된 어플리케이션끼리 느슨하게 연결해주고 신뢰성을 보장하며 비동기 처리가 가능하게 해준다
    - 스프링은 JMS API위에 추상화 레이어를 제공함으로써 JMS프로바이더와의 상호작용을 더 쉽게 만들어준다
    - JMS Message Broker : 목적지에 안전하게 메시지를 건네주는 중개자
    - JMS Destination : 목적지에 배달될 2가지 메시지 모델 Queue or Topic

* ActiveMQ
    - MOM(메시지 지향 미들웨어)
    - 가장 대중적이고 강력한 오픈소스 메시징, 통합 패턴 서버
    - 다양한 언어를 이용하는 시스템간의 통신, 클러스터링 제공
    - 클라이언트 간 메시지를 소수신 할 수 있는 오픈 소스 Broker(JMS서버)
    - 처리구조 : Producer(생산자) 가 메시지를 Broker의 Queue, Topic에 넣으면 Consumer가 Message를 가져와 처리하는 방식

--- 

* 작업스케줄링 & 비동기 실행
    - 두가지 방법 중에 골라서 사용
    - 1. 스프링 TaskExecutor로 java.lang.Runnable 작업을 비동기 실행 가능, 스프링 TaskScheduler로 java.lang.Runnable 작업 스케쥴링
    - 2. 스프링 @Async 애너테이션을 이용해 메소드를 비동기 실행, 스프링 @Scheduled 애너테이션을 이용해 메소드의 실행 스케쥴 설정

---

* 캐시 
    - 캐시매니저, 캐시저장소 
    - @Cacheable : 메서드에 이것을 설정하면 반환값을 캐시에 넣는다는 뜻
    ```java
    @Cacheable(cacheNames={"fixedDepositList"}, key = "#bankAccountId")
    public List<FixedDepositListDetails> findFixedDepositByBankAccount(int bankAccountId){
        // 캐시 키를 지정하지않으면 bankAccountId 를 \키로 사용함
        return dao.getList();
    }
    ```
    - @CacheEvict : 어떤 메서드가 호출되면 캐시에 있는 데이터를 비울때 이것을 사용
    - 전부 지우려면 allEntries = true, 메소드 호출전에 비우려면 beforeInvocation = true

    
    - 특정 캐시 아이템만 캐시에서 지우려면 key 를 지정 
    ```java
    @CacheEvict(cacheNames = { "fixedDepositList"}, allEntries=true, beforeInvocation = true)
    public void something(){return;}
    ```
    - @CachePut : 메소드 반환값 무조건 캐시에 넣어야한다는 의미, 캐시에 키에 해당하는 것이 있으면 호출하지말라고 하는 Cacheable과는 다름



--- 

* AspectJ
    - 스프링 어노테이션 @EnableAspectJAutoProxy 를 활성화하면 런타임시에 동작하는 프록시 생성함 
    - 내가 조사한 바로는 어드바이스 늘어날 수록 느림
    - 어드바이스(타겟에 제공할 부가기능을 담고있는 모듈) 
    - 컴파일타임또는 클래스파일로드시에 weaving 하는 방법이 더 성능이 빠르다고 자료를 찾음 
    - 하지만 후자는 pom 기준 aspectj-maven-plugin 설정도 해야하고, 
    - 나중에 성능상 불리함이 느껴질때 후자를 사용하는 것이 좋겠다. 