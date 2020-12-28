# Oauth 2.0 기반 로그인 구현
* 학습 링크
    - https://meetup.toast.com/posts/105 대략적인 그래프
* 용어
    - 리소스 서버 (Naver, Google)(권한부여서버, 인증서버, 리소스)
    - 리소스 오너 (Naver, Google 계정을 가지고있는 사용자)
    - 클라이언트 (Naver, Google 기반 로그인을 제공하거나 관련서비스 제공하는 우리서버)

* 절차 
    - 총 4가지의 인증 방법을 가지고 있다. 
    - Authorization code grant (3-legged)
        - 비교적 안전, (access토큰을 바로 클라이언트로 전달하지않아 잠재적 유출방지, 서버사이드 코드로 인증, 로그인시 페이지 url response_type=code
    - Implicit Grant (3-legged 3자)
        - oAuth2.0에서 가장 많이 사용됨, public 클라이언트 브라우저 기반의 어플리케이션, 모바일 어플리케이션에서 이 방식을 사용
        - 권한코드 없이 바로 발급되서 보안에 취약, 주로 read only 서비스에 이용 로그인시 response_type=token
    - 2-legged(2자) (password credentials grant, client credentials grant)
        - 잘 안쓰임

* Authorization Code Grant 방식 절차
    - 리소스 오너 클라이언트에 xx로 로그인하기 시도 -> 클라이언트는 client Id와 Redirect_URI 를 리소스 오너에 전달
    - 리소스 오너 client id와 redirect_URI와함께 권한서버에 로그인 페이지 요청 -> 권한서버는 로그인페이지 제공
    - 리소스 오너 id password 입력 -> 권한서버 authorization code 발급해서 리소스 오너에 전달
    - 리소스 오너에 전달되는 동시에 아까 redirect_URI(클라이언트)로 authorization code 전달
    - 클라이언트 받은 authorizaiton code 로 authorization server에 access token 요청 -> authorization server가 클라이언트에 access token 전달
    - 클라이언트 -> 리소스오너 (인증완료 및 로그인 성공)

* 취약점
    - CSRF : csrf 방지값을 이용해서 보안
    - Covert Redirect : 공격자가 사용자에게 redirect Uri 를 자기껄로 바꿔서 공격 -> 리소스서버에서 서비스 요청할때 적어야해서 괜찮을듯  