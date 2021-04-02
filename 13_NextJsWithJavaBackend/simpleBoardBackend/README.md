# spring-template
* 
```
쉽게 스프링 프로젝트를 시작하기 위하기 위해 제작
Docker, docker-compose 활용하여 자동 빌드, 이미징, 배포, 실행
.bat 또는 .sh 로 간편하게 수행

Windows10 또는 Linux환경에서 개발 중에
스프링부트처럼 간단히
개발자가 자신의 데스크탑에 was를 설치할 필요없이
docker를 이용해 로컬에서 테스트를 위한 실행 가능하게함
```

* 커스텀화
```shell
# 이 레포지토리를 이용한 프로젝트 예상 구조
/projectRoot
    /spring-template-backend/**
    /react-frontend/**
    /someOtherProject/**
    docker-compose-dev.yml
    docker-compose-production.yml
    script.sh
    script.bat
    README.md
# 커다란 프로젝트 루트 폴더 밑에
# 지금 현재 레포지토리 spring-template위치하고
# react프론트엔드도 위치하고
# docker-compose작성하고
# script.sh 에 빌드, 이미징, 런 까지 포함해서 자동화
# !!! 필수 !!!
# spring의 config디렉토리, 등등 원하는 입맛에 맞게 재설정 필요
# docker-compose 입맛에 맞게 재설정 필요
```

* 포함
    - hibernate, hikariCP, h2(test), postgres(prod)
    - spring webmvc
    - spring security
    - lombok
    - index.jsp





# 실행 
* 필요사항
    - Openjdk8
    - Maven 
    - Docker
    - Docker-compose
    - WSL2(windows 10 환경일때)
* 실행 순서
```shell
mvn package -f .\ '-Dmaven.test.skip=true'
docker-compose -f docker-compose-dev.yml up -d  --build backend
docker-compose -f docker-compose-production.yml up -d

# 이것을 기반으로 스크립트파일 만들어서 통합해도됨
```




# Manual Maven Build & Docker
* Maven Build
    - mvn clean -f .\
    - mvn package -f .\
    - mvn package -f .\ -Dmaven.test.skip=true
* Dockfile
    - openjdk8 tomcat9 환경
    - docker build --tag spring-template:1.0 .
* 컨테이너 올리기
    - docker run --rm -p 80:8080 spring-template:1.0
* 도커컴포즈 올리기
    - 이름 docker-compose.yml일때 docker-compose up -d
    - 사용자정의 이름은 docker-compose -f something.yml up -d
    - rebuild 원할시 --build 옵션 추가 




