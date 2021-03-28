# GoLang 학습
* 목표
    - go ethereum 코어 분석가능한 정도까지 학습
* 참고 사이트
    - https://golang.org/doc/
    - https://gyurious.tistory.com/42
* 사전 준비
    - go 설치(공식 사이트)
    - 에디터 설치(ex vsc)
* 실행 
    - go run "file path/~.go"
* 새로운것
    - defer 
        - 함수내에서 defer a.doSomething()
        - defer b.doSomeThing()
        - 식으로 해서 defer 스택에 쌓고 함수가 끝날때 하나씩 꺼내서 실행
        - 약간 동적메모리할당 풀어주는데 쓸만한 물건같이 생김
    - c와 같이 포인터는 지원하지만 포인터 산술은 지원하지않음 
* 실습
    - 01_basic 
        - 기본적인 헬로월드 테스트, 외부 패키지 검색 및 사용
        - go run 간단한 파일 하나 실행용, go build 여러 go 파일 뭉쳐서 빌드
    - 02_create_mod > 다음을 학습
        - 새로운 모듈 생성 및 다른 코드에서 호출
            - 모듈은 관련된 패키지들을 포함해서 관리
            - 코드들은 패키지로 뭉치고 -> 패키지는 모듈로 뭉친다
            - go module 은 다양한 버전정보를 포함하고있다
            - git mod init example.com/greetings
            - 코드가 들어갈 모듈 경로?이름을 입력해준다 
            - example.com/greetings 프로덕션코드에서는 url이 들어가야한다.
            - 그 url이 이 모듈을 다운받는 경로가 되어야한다
            - vsc 에서 적절한 import 문을 삭제시키는 문제 "go.formatTool": "gofmt" 설정 and ctrl+shift+p > configuration language~~ > go > organizeImport false 상위도 false
            - 패키지에서 소문자이름의 함수는 private 대문자 이름은 public 식으로 동작 암묵적으로 ㅎ.. 
        - 에러 핸들링
            - 에러 던지기 에러 받기 로깅패키지로 fatal 메시지 보내고 프로그램 exit 시키기
        - 랜덤한 리턴 연습
            - 시간을 시드로 랜덤정수 생성
        - key value 페어
            - 맵에 저장 초기화까지 해주려면 make
        - 유닛테스트
            - go test or 세세하게 보려면 go test -v
        - 설치 
            - go install 명령어는 설치관련 명령어
            - go list -f '{{.Target}}' 로 hello 가 어디에 생기는 지 확인
            - 나의 경우에는 내 홈경로\go\bin\hello.exe 였다
            - 이 설치경로를 바꾸려면은 GOBIN 환경변수에다가 그 대안경로를 넣어주면된다
            - go install을 하면 컴파일후 인스톨해준다
            - 단순히 hello를 커맨드창에서 타이핑하는것만으로 실행할 수 있다.
            - (그냥 path 환경변수 관련 세팅인듯 go install 명령어랑 go build 랑 다른점?)
            - go build는 단순히 컴파일하고 실행파일을 목표에다 가져다두는것이고
            - go install은 조금 더 뭔가를 하는데 $GOPATH/bin 에다가 넣는다 $GOBIN이 설정되어있으면,, 그리고 non main 패키지들을 캐시해놓는다. 변경사항없으면 계속 재활용

    
