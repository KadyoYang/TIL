# codePipeLine + S3 + React app CICD
`https://wornoffkeys.medium.com/continuous-deployment-with-aws-code-pipeline-and-react-js-c1aa1dbf5f9d`


### Github 레포지토리 생성
### AccessToken 생성 및 AWS 에 등록 또는 인지하고있으세요
### S3 Bucket생성 ex)tacomo-admin-dev
    * 웹사이트 호스팅 활성화
    * index.html, index.html 설정
    * Block all public access 언체크
    * Bucket Policy에 다음 입력

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_S3_BUCKET_HERE/*"
        }
    ]
}
```

### CodePipeLine 생성
### Github 에서 레포지토리 브랜치 연결
### CodeBuild 생성 
    * Amazone Linux 2
    * Runtime standard 
    * buildspec 파일 위치 
### CodeDeploy 생성 
    * Extract file before deploy 체크 
    * 아까 만든 S3 버켓 클릭 
### 소스코드에 buildspec.yaml 생성 
```yaml
version: 0.2

# https://docs.aws.amazon.com/ko_kr/codebuild/latest/userguide/sample-docker.html

phases:
  install:
    runtime-versions:
      nodejs: 12

  pre_build:
    commands:
      - npm install

  build:
    commands:
      - npm run build


artifacts:
  files:
    - '**/*'
  discard-paths: no
  base-directory: build

# library caching
cache:
  paths:
    - 'node_modules/**/*'

```