# Next.Js with Java backend
> https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-next-js-app-with-java-backend-c8101dedc79e

```
Next.js 앱을 빌드하고 포장해서 실제 production에 배포하는 방법은 진짜 여러가지가 있다
하나는 next 앱을 자바나 nodejs와 빌드하거나 
또다른 방법은 Next를 빌드하고 그 static content를 NginX로 제공하는 방법이다 

자바와 함께하는 방법을 하려면은 server단 코드와 잘 해쳐나가야한다. 
예를들면은 당신은 java와 함께 index.html을 로드해야한다.
```

### Index
* 소개
* 프로젝트 개발, 빌드 방법
* Production 수준 빌드 방법
* 정리

### 소개
```
Next.js는 정적웹사이트, JAMstack(웹 개발 빠르게 하기 위한 아키텍쳐), Production, Desktop, lightweight app, pre-rendered apps mobile web, 등등을 위한 React 프레임워크다
nextjs는 react pre-rendering 쉽게 만들게 해준다

react는 라이브러리이지 프레임워크가 아니다, 그래서 사용하는 방법이 진짜 여러가지가 있다. 
그래서 이 글에서는 next.js 프레임워크로 react 웹 어플리케이션을 빠르게 개발하는 방법을 알려주겠다.

Next.js 는 web app을 구축하기위한 javascript 프레임워크이고 Next.js는 스스로 browser에 로드하지않는다.
우리는 정적자원(css, js)를 포함한 Next.js 어플리케이션의 index.html을 로드하는 일종의 메카니즘이 필요하다 
이 글에서는 Next.js assets를 로드하는 놈으로 Java Tomcat Container를 웹서버로 사용할 것이다.
java tomcat container는 next.js로부터 다양한 API calls를 처리해야할것이다

그림 링크 : https://miro.medium.com/max/700/1*lTvyDHbkzVwHE2XzqahEtg.png
Next <-(load index.html for all the other routes) Tomcat Container(handle all the /api routes) <-> client browser

/api로 시작하는 요청은 apache tomcat container에서 핸들하고
그 외는 next router로 갈것이다

```


### 프로젝트 개발, 빌드 방법
```
개발시기에는 3000 8080 따로 올리고 하자

프로젝트 구조
src/main/java //we put all the java source code here
src/main/ui //we put all the NEXT UI code under this folder
src/main/resources //we put any configuration or resources here such as data.sql, properties file, etc...
src/test/java //all the java test code goes here

```



### Production 수준 빌드 방법
> 단순히 next 3000포트 서브하고 java 백엔드 80 열어서 개발때 사용할 수있는데
> 프로덕션수준으로 app을 올려야한다면 Next code를 Java와 함께 패키징해서
> 하나의 port로 제공해야한다.
> maven이나 gradle 플러그인이나 gulp를 사용해서 production수준의 패키징을 할 수 있다.


### 정리
* React app 개발 빌드에는 수많은 방법이 있다.
* 그중하나가 java와 next 함께 빌드하는 방법
* 개발시기에는 next따로 tomcat따로 올려서 테스트 등등 하고
* next와 tomcat의 상호작용은 모든 call을 api로 프록싱하는 것과 같이 일어난다
* production시기에는 nextapp의 모든 asset을 java code에 옮기자
* maven plugin이나 gulp를 통해서 프로덕션수준의 application 패키징을 할 수 있다.