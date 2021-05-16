# public ecr 활용
> 아 docker hub 왜 anoymoous한테 6시간동한 100회 풀 제한이야아..
> 때문에 aws codebuild 에서 docker build할때 이미지 풀에 제한이 생긴다 아
> 따라서 제한이 없는 aws public ecr repo를 활용할거다 

## 명령
* public ecr 에 push 할 이미지 풀 & 태깅 & 푸시
- docker pull openjdk:8-jdk-buster
- docker tag openjdk:8-jdk-buster public.ecr.aws/{myRegistryAlias}/test_openjdk8:latest
- docker push public.ecr.aws/{myRegistryAlias}/test_openjdk8:latest

## 아 올리기전에 apt install 작업은 다 한 이미지로 만들고 올려라!