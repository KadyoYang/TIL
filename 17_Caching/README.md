# Cache 
> https://www.baeldung.com/spring-cache-tutorial

* REDIS
* memcache
* ehcache 
    - 자바 앱에 붙어서 작동 

<br /><br />


# Srping Cache Abstraction
## 의존성
```xml
<!-- 코어 캐싱 추상화가 있는 모듈 spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>{spring-version}</version>
</dependency>

<!-- 
    이거는 EhCache, Caffeine같은 쪽이 제공하는 캐시매니저를 추가로 제공한다
    일단 spring-context에서 더 추가되는 것이기 때문에 둘중에 아무거나 추가해도됨
    암튼 EhCache같은 것을 캐시 스토리지로 쓸려면은 이것을 사용하는게 더 편하다
 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>{spring-version}</version>
</dependency>


<!-- Spring BOOT는 다음을 추가 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
    <version>{boot-version}</version>
</dependency>
```

## 캐시 활성화
* 스프링은 Enable~~~ 어노테이션같은걸 많이 잘 지원해준다. 다음과 같이 Enable하면 된다.
```java
@Configuartion
@EnableCacheing
public class CachingConfig {

    // 물논 xml로도 설정 가능하지만 java 로 설정하자
    @Bean
    public CacheManager cacheManager(){
        SimpleCacheManager cacheManager = new SimpleCAcheManager();
        cacheManager.setCaches(Arrays.asList(
            new ConcurrentMapCache("directory"),
            new ConcurrentMapCache("addresses")
        ));
        return cacheManager;
        // return new ConcurrentMapCacheManager("addresses");
    }
}

```


## 어노테이션을 통한 캐시 사용
* 일단 caching 을 enable했으면 
* 메소드에 캐시 작동같은것을 선언형 어노테이션으로 바인드 하면 된다.

#### @Cacheable
* 캐시기능을 간단하게 넣는 방법은 `@Cacheable("캐시 이름")` 식을 메소드 위에 적는것이다
* 일단 적어놓으면 메소드 실행전에 캐시 체크를 하게된다
```java
@Cacheable("addresses")
public String getAddress(Customer customer){...}

@Cacheable(value = "addresses", key = "#customer.name")
public String getAddress(Customer customer){...}

// 다음과 같이도 된다
// 둘중에 하나라도 캐시를 가지고 있으면 그것을 리턴한다
@Cacheable({"addresses", "directory"})
public String getAddress(Customer customer){...}
```

#### @CacheEvict
* 모든 메소드를 `@Cacheable`로 만들면 생길수 있는 문제가 사이즈의 문제다
* 캐시를 자주 쓰지 않는 데이터로 꽉 채우고 싶지않다.
* `@CacheEvict` 를 사용해서 하나, 여러개, 전체 캐시에 대한 삭제를 설정할 수 있다. 
```java
// CacheEvict에 value말고도 allEnties=true라는 것이 추가되어있다.
// 전부 지운다는 뜻인데, 전부 지워서 새로운 신선한 캐시를 추가할수있는 환경을 만들어주는거다
@CacheEvict(value="addresses", allEntries=true)
public String getAddress(Customer customer){...}
```

#### @CachePut
* `@CacheEvict`가 캐시에서 탁하고 쓰이지 않는 캐시들을 줄여주는 동안에 
* 우리는 너무 많은 데이터를 캐시에서 없애고 싶지가 않다.
* 대신에 우리는 선택적으로 특정 엔트리를 수정했을때 캐시에 있는 것도 업데이트 하고싶다.
* `@CachePut`과 함께라면 할 수 있다.
* 일단 메소드를 실행하고 결과를 캐시한다.
```java

// @Cacheable과의 차이점이라면은 @Cacheable은 메소드의 실행을 스킵할수도있는데
// @CachePut은 메소드를 실행하고 결과를 캐시한다는거다
@CachePut(value="addresses")
public String getAddress(Customer customer){...}

```

#### @Caching, @CacheConfig
* 다음을 하고싶다.
```java 
// 잘못된 사용
@CacheEvict("addresses")
@CacheEvict(value="directory", key=customer.name)
public String getAddress(Customer customer) {...}


// 가능한 사용
@Caching(evict = {
    @CacheEvict("addresses"),
    @CacheEvict(value="directory", key=customer.name)})
public String getAddress(Customer customer) {...}


// 클래스레벨에서 cacheName같은거를 클래스레벨에서 한꺼번에 하고 싶으면
@CacheConfig(cahceNames={"addressses"})
public class CustomerDataService{

    // 여기다가 값 안줬죠?
    // 근데 이렇게 쓰면 뭔가 조금 그렇다. 내 취향이 아니네
    @Cacheable
    public STring getAddress(Customer customer) {...}
}

```

#### 조건이 있는 캐싱
* CAchePut같은 경우는 무조건 메소드실행하고 결과를 캐시하는데 이거 좀 컨트롤하고싶다.
```java

// 이름이 tom이면 캐시하겠다
@CachePut(value="addresses", condition="#customer.name=='Tom'")
public String getAddress(Customer customer) {...}

// 결과가 64가 이하가 아닌 이상은 캐시한다
@CachePut(value="addresses", unless="#result.length()<64")
public String getAddress(Customer customer) {...}
```