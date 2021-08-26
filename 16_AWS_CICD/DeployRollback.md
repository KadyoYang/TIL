# 배포 및 롤백
* 개요
```
ecs 에서
production 앱을 배포할때 
이미지 latest로만 설정해서 배포할수있는데
그러다가 롤백했을때 ecr 이 그대로 남아서 롤백을 해도 문제의 image가 계속 latest로 남아서
배후를 찌를 수 있음

따라서 버저닝을 하는게 좋은 것 같은데 다음과 같음
테스트결과 task definition을 잘 롤백이 됨 그 점을 이용해서 다음과 같은 
production용 그 것을 가져가자.. 그것..
```

* `1. 신버전 배포 결정`

* `2. production용 codebuild Project 환경변수에 새로운 image tag 버전을 명시 ex) 0.0.2`

* `3. 새로운 image tag로 최신화된 task definition 개정 생성`

* `4. appspec.yaml에 새로운 task definition 개정 버전을 최신화`

* `5. main 브랜치에 dev브랜치 merge & main branch github에 push`

* `X. 만약 roll back이 됬다 하면 어차피 개정이 전버전으로 rollback 가는거니까 문제없음`