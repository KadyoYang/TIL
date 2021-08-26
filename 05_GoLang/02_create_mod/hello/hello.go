package main

import (
	"fmt"
	"example.com/greetings"
	"log"
)

// 와 고 하 vsc 인스텐션 진짜 극혐이네 왜 지맘대로 없애냐
// 분명 formatOnsave false로 뒀을텐데 누구 맘대로 없애냐 하
// organizeImport false로 두니까 괜찮아졌다.

// example.com/greetings 는 퍼블리쉬되지않은 그리팅스모듈이다
// 그래서 go.mod 에
// replace example.com/greetings => ../greetings 를 적어줘야한다
func main() {
	// 로거 설정
	// 로그 찍힐때 프리픽스 설정
	log.SetPrefix("greetings: ")
	// 시간 소스파일, 라인넘버 찍히는 거 끄는 플래그 0은끄고 1은 날짜 2는 시간 3은 날짜+시간 아 나머지는 문서참조
	log.SetFlags(0)



	// get a greeting message and print it
	message, err := greetings.Hello("yo")
	// 에러 발생해서 리턴되있으면 콘솔에 출력하고 프로그램 종료
	if err != nil {
		log.Fatal(err)
	}

	// 에러가 아무것도 안리턴됬으면 리턴된 메시지 콘솔로 출력
	fmt.Println(message)


	names := []string{"udo", "gabi", "falco", "zofia"}
	messages, err := greetings.Hellos(names);
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(messages);


	
}
// 와 고에서는 소문자로 시작하는 함수는 암묵적으로 private 식으로 처리한다  멋진데
