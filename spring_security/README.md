# 스프링 시큐리티 학습
* 학습 경로
    - https://jeong-pro.tistory.com/205
    - https://spring.io/guides/topicals/spring-security-architecture 여기 체크

* 로그인 과정 순서도 
    - 클라이언트(브라우저)로부터 요청이 오면 요청은 ApplicationFilter객체들로 먼저 가게됨
    - Encoding Filter.. 등등 Filter지나다가 DelegatingFilterProxyRegistrationBean 필터 만나고 
    - DelegatingFilterProxy클래스로 만들어진 스프링 빈을 등록시켜준다(부트에서는 autoconfig-> springSecurityFilterChain빈 등록후 DelegatingFilterProxy(springSecurityFilterChain)동작)
    - DelegatingFilterProxy는 FilterChainProxy라는 필터 클래스에 처리를 위임(이 안에 여러 시큐리티 관련된 필터 List존재)
    - FilterChainProxy 내부에 체인으로 등록된 필터를 수행한다.(logoutfilter..usernamepasswordauthenticationfilter...등등)
    - 이 등록된 필터리스트들이 AuthenticationFilter 이다.
        - AuthenticationFilter 리스트(위에서 아래로 동작)
            - WebAsyncManageIntegrationFilter : SpringSecurityContextHolder는 ThreadLocal기반(하나의 쓰레드에서 SecurityContext 공유하는 방식)으로 동작하는데, 비동기와 관련된 기능을 쓸 때에도 Security Context 를 사용할 수 있도록 만들어주는 필터
            - SecurityContextPersistenceFilter : SecurityContext가 없으면 만들어주는 필터, SecurityContext는 Authentication 객체를 보관하는 보관 인터페이스임
            - HeaderWriterFilter : 응답(response)에 security와 관련된 헤더값을 설정해주는 필터
            - CsrfFilter : csrf 공격을 방어하는 필터
            - LogoutFilter : 로그아웃 요청을 처리하는 필터, DefaultLogoutPageGeneratingFilter가 로그아웃 기본페이지를 생성
            - UsernamePasswordAuthenticationFilter : username, password 를 쓰는 form 기반 인증을 처리하는 필터, AuthenticationManager를 통한 인증을 실행, 인증성공시 Authentication 객체를 SecurityContext에 저장후 AuthenticationSuccessHandler 실행, 실패하면 AuthenticationFailureHandler 실행
            - RequestCacheAwareFilter : 인증 후, 원래 Request 정보로 재구성하는 필터
            - SecurityContextHolderAwareRequestFilter 
            - AnonymousAuthenticationFilter : 이 필터에 올 때까지 앞에서 사용자 정보가 인증되지 않았다면 이 요청은 익명의 사용자가 보낸 것으로 판단하고 처리(Authentication 객체를 새로 생성 -> AnonymousAuthenticationToken)
            - SessionManagementFilter : 세션 변조 공격 방지(sessionid를 계속 다르게 해서 클라이언트에 제공) 유효하지 않은 세션일때 url핸들링, 하나의 세션 으로 최대 몇개 동시접속 설정, 세션 생성 전략 설정
            - ExceptionTranslationFilter : 앞선 필터 처리 과정에서 인증예외(AuthenticationException) 또는 인가예외(AccessDeniedException)가 발생한 경우, 해당 예외를 캐치하여 처리하는 필터(모든 예외를 다 이 필터에서 처리하는 것은 아님)
            - FilterSecurityInterceptor : 인가(Authorication)를 결정하는 AccessDecisionManager에게 접근 권한이 있는지 확인하고 처리하는 필터 
            - oauth 사용 설정시 oauth용 필터 추가함
    - UsernamePasswordAuthenticationFilter 클래스 내에 attemptAuthentication(request, response) 메소드에서 요청으로부터 username, password 얻어오고 UsernamePasswordAuthenticationFilterToken(Authentication 인터페이스 구현체) 을 만들고 AuthenticaitonManager의 구현체인 ProviderManager에게 인증을 진행하도록 위임
    - ProviderManager는 멤버변수로 가지고 있는 AuthenticationProvider들에 인증을 위임처리하고 그중에서 AuthenticationProvider를 구현한 객체가 인증 과정을 거쳐서 인증에 성공하면 요청에 대해서 ProviderManager가 인증이 되었다고 알려주는 방식
    - ProviderManager는 여러 AuthenticationProvider를 순회하면서 UsernamePasswordAuthenticationToken을 처리해줄 provider를 찾는다.

* 로그인 과정 요약 순서
    - 요청
    - ApplicationFilter
    - DelegatingFilterProxyRegistrationBean -> DelegatingFilterProxy빈 등록
    - DelegatingFilterProxy FilterChainProxy 필터 클래스에 처리 위임
    - FilterChainProxy가 가지고 있는 필터중에 UsernamePasswordAuthenticationFilter 를 보자
    - UsernamePasswordAuthenticationFilter.attemptAuthentication(request, response) 메소드에서 username, password 얻어오고 UsernamePasswordAuthenticationFilterToken 만들어서 ProviderManager에게 전달
    - ProviderManager는 자신이 가지고있는 AuthenticationProvider는 자신이 가지고있는 Provider들을 순회하면서 UsernamePasswordAuthenticationToken을 처리해줄 Provider를 찾는다.
    - Provider에서 인증

* 프로젝트 확인해야할 파일
    - AccountAuthenticationProvider.java, AccountSecService.java
    - WebSecurityConfig.java

