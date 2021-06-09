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
        return new ConcurrentMapCacheManager("addresses");
    }
}

```