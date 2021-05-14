# AWS

## 역할 & 정책
```
정책들을 모아서 하나의 역할을 만들고
그 역할을 IAM계정이나 AWS리소스에 준다.

ex)
code deploy용 역할에는 s3에 대한 액세스 정책, ecr에 대한 액세스 정책등이 있으면 좋다 
```


## ECR 
```
하나의 레포지토리당 하나의 이미지 넣으면 되고 
태그는 보통 latest 넣고 나머지 옛날것들은 <untagged> 되더라

```

## EC2 
```
기본적인것 생략

보안그룹(sg) : 인바운드 아웃바운드 정책설정 ecs클러스터 서비스에 대한 정책, elb에 대한 정책이 보통 들어감 


로드밸런서
리스너 80포트
-> target group 1 에 포워딩
target group 1 은 80받고 8080포트 타겟 컨테이너로 포워딩
```


## ECS fargate
```
ecs 클러스터 

task definition
- 이름
- 역할
- 작업 메모리, cpu
- 실행할 도커 이미지 {메모리 제한, 포트매핑, 환경변수}

service
작업, 배포 옵션, 로드밸런서, 등
```

## aws cloud formation
```
구성을 미리 설정으로써 지정해주고 
스택형식으로 필요한 환경을 뚝딱 생성 
```



## 단계
```
1. Github 레포지토리 생성 및 access token 발급
2. 이미지용 ECR 레포지토리 생성
3. 브랜치에 buildspec.yaml 생성
4. codepipeline 정의
5. 소스 커밋
6. 이미지를 기반으로 task definition 생성
7. ecs 클러스터 생성
8. alb생성 
9 서비스 생성 




```