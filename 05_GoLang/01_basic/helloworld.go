package main

// main 패키지 선언
// 이 패키지라는 것은 함수들을 하나의 패키지로 묶을때 사용

// 왜 go rsc.io/quote 자동으로 다운 안받지 이거 참고
// https://stackoverflow.com/questions/64442213/cannot-find-package-rsc-io-quote
// go mod init "너의모듈명" 해줘야 의존성 다운로드 해준다 및 의존성 추적 버전관리
//

/*
이 fmt 패키지는 기본적으로 내장하고있는 패키지고 콘솔에 출력 텍스트 포맷팅등의 기능을 담고있는 함수를 가지고있다
*/
import (
	"fmt"

	"rsc.io/quote"
)

// main 패키지 선언
// 이 패키지라는 것은 함수들을 하나의 패키지로 묶을때 사용

// 왜 go rsc.io/quote 자동으로 다운 안받지 이거 참고
// https://stackoverflow.com/questions/64442213/cannot-find-package-rsc-io-quote
// go mod init "너의모듈명" 해줘야 의존성 다운로드 해준다

/*
이 fmt 패키지는 기본적으로 내장하고있는 패키지고 콘솔에 출력 텍스트 포맷팅등의 기능을 담고있는 함수를 가지고있다
*/
func test01() {
	fmt.Println("Hello, World!")
	fmt.Println(quote.Go())
	fmt.Println(quote.Glass())
	fmt.Println(quote.Hello())
	fmt.Println(quote.Opt())
}

/*
헬로월드 출력하기위해 main을 구현함
파일안에서 코드를 실행하면 디폴트로 main을 실행함
*/

/*
외부 패키지 코드 호출하기
pkg.go.dev 방문
테스트용 패키지 quote 검색 ( 이거는 잠시 무시 rsc.io/quote/v3)
검색결과 나온 리스트에서 쓰고싶은거 클릭
인덱스아래 Doc탭 에 사용할 수 있는 함수 목록이 나옴
클릭하고 페이지 맨위에 quote패키지가 rsc.io/quote모듈에 있는것을 확인해라

*/

/*
Go is a tool for managing Go source code.

Usage:

        go <command> [arguments]

The commands are:

        bug         start a bug report
        build       compile packages and dependencies
        clean       remove object files and cached files
        doc         show documentation for package or symbol
        env         print Go environment information
        fix         update packages to use new APIs
        fmt         gofmt (reformat) package sources
        generate    generate Go files by processing source
        get         download and install packages and dependencies
        install     compile and install packages and dependencies
        list        list packages or modules
        mod         module maintenance
        run         compile and run Go program
        test        test packages
        tool        run specified go tool
        version     print Go version
        vet         report likely mistakes in packages

Use "go help <command>" for more information about a command.

Additional help topics:

        buildconstraint build constraints
        buildmode       build modes
        c               calling between Go and C
        cache           build and test caching
        environment     environment variables
        filetype        file types
        go.mod          the go.mod file
        gopath          GOPATH environment variable
        gopath-get      legacy GOPATH go get
        goproxy         module proxy protocol
        importpath      import path syntax
        modules         modules, module versions, and more
        module-get      module-aware go get
        module-auth     module authentication using go.sum
        module-private  module configuration for non-public modules
        packages        package lists and patterns
        testflag        testing flags
        testfunc        testing functions


*/
