# 순서
> repository > CICD
* 아 하트비트 이거 유예시간을 좀 줘야지 healthy로 좀 숨을 쉬지 
* 애초에 처음에 파워를 좀 주던가 


## 0. ELB 생성 
* 기본 리스너 타겟 제거 

## 1. 레포지토리 생성 및 devops 파일 생성 
* Github 레포지토리 생성
* Maven, Gradle, 등등 원하는 프로젝트 생성
* 빌드배포를 책임질 devops 폴더를 생성
* devops 폴더에 prod, dev 형식으로 폴더 생성
* 각각에 appspec.yaml, buildspec.yaml 생성 
    - buildspec : 빌드 및 docker build
    - appspec : 배포할 타겟서비스에 대한 명세 및 옵셔널한 람다를 통한 테스트

## 2. ECR 레포지토리 및 S3 생성 
* ECR 레포지토리는 이미지이름
* S3는 없으면 생성
* codebuild 용 public ecr 레포지토리로 tomcat8 같은거 이미지 만들어서 푸시해서 사용

## 3. ECS 클러스터 생성
* 네트워킹 전용 fargate 사용할 것이기 때문
* 클러스터 이름 `test-dev-cluster` 또는 `test-prod-cluster`

## 4. CodePipeline 설정
* dev와 prod를 따로 만들것임
    - dev와 prod마다 다른 buildspec과 appspec을 사용
    - 각각의 파이프라인마다 환경변수가 다름
* 파이프라인 생성 
    - 보이는대로 입력
* 파이프라인 생성중 codebuild 프로젝트 생성
    - 프로젝트 이름 `test-dev-cb`
    - 태그도 똑같이 그냥 태그 Name에는 다 기본적으로 이름 넣으면 편할듯
    - 소스공급자 `Github` 액세스토큰은 repo, org, admin:repo_hook 필요할듯
    - 소스버전에는 `dev` 또는 `main` 브랜치 넣으면 됨
    - 빌드환경은 자유, 도커이미지 빌드를 하니까 권한이 있음 체크 
    - 서비스역할은 EC2ContainerRegistryPowerUser정책이랑 CloudWatch Logs, CodeBuild 쓰기, S3 읽기 쓰기 권한있는 정책 넣어야함, 근데 자동생성되는데 ECR은 직접 넣어줘야할수도있음 꼭 체크하셈
    - 추가 구성에 환경변수 입력
    ```bash
    AWS_DEFAULT_REGION : `ap-northeast-2` 같은거 
    IMAGE_REPO_NAME : `ecr 레포지토리 이름`
    IMAGE_TAG : `latest`
    AWS_ACCOUNT_ID : `너 url에 보이는 12자리 숫자`
    ```
    - buildspec이름에는 내 CIDE 레포 기준으로 devops/dev/buildspec.yaml
    - 아티팩트는 Amazon S3 에 저장하는걸로 실제는 ECR에 저장하지만 appspec.yaml을 던져줘야하니 사용
    - 아티팩트 패키징은 없음 
    - 추가구성에서 캐시유형을 정해야하는데 -> 빠르고 값싼 빌드를 위해
    - S3로 하면은 maven 의존성라이브러리들은 캐싱이 되는데 도커이미지쪽은 어떻게 해야하는지모르겠네 
    - 그래서 로컬로 하고 DockerLayerCache, CustomCache 키자 XXX
    > 아 S3로 해라 왜냐하면 DockerLayerCache 라이프타임이 짧다 아.. docker hub pull limitation..
    - 생성

## 5. ECS task definition 작성 
* task definition 이름 작성 
* 작업 사양 설정
* 컨테이너 설정
    - 컨테이너 이름 ex) `test-dev` 식으로 
    - 이미지 `ecr repo uri:latest`
    - 컨테이너 실행 환경변수 추가, 스프링 프로파일 같은거
    - spring.profiles.active = dev
    - SPRING_PROFILES_ACTIVE = dev
* 생성된 Task Definition 정보를 참고해서 appspec.yaml 수정
    - TaskDefinition : `"taskDefinitionArn": ~~~ 있는거 입력`
    - Container Name, Port 있는대로 입력

## 6. ECS service 작성 
> 여기서 codedeploy 및 elb 등이 자동설정됨 물론 적절한 보안정책 설정은 당신이 잘 해내야함
* 서비스 구성 
* 네트워크 구성 -> 보안그룹 설정에서 잘 설정 (만약 8080호스팅있으면 서비스에대한 보안정책으로 8080뚫어줘야함)
* prod면 테스트 포트도 구성해야함 
## 7. 자동으로 생성된 codeDeploy 어플리케이션을 codepipeline에 부착
* dev면은 허가없이 한번에 바뀌고 예전꺼 0분만에 없애는 설정을 dev-deploy app에 설정
* prod면 허가가 있어야 바뀌고 테스트 포트도 있어야하고 허가가 있어야 바뀌어야하고 유예시간 5시간은 줘야함 