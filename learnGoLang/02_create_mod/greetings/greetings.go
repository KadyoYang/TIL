package greetings

// greetings 패키지를 선언 -> 관련된 코드들을 합치기 위해서

import "fmt"
import "errors"
import "math/rand"
import "time"

// hello 함수를 구현 (implement하다)
// func 함수이름(파라미터이름 파라미터타입) 리턴 타입
//Hello returns a greeting for the named person
func Hello(name string) (string, error) {
	// return a greeting that embeds the name in a message.

	// 만약 이름이 전달안되면 에러를 리턴
	if name == "" {
		return "", errors.New("empty name")
	}
	// 이름이 전달됬으면 정상동작
	message := fmt.Sprintf(randomFormat(), name)
	// go 에서는 := 는 선언 및 초기화하는 오퍼레이터임
	// 이 코드는 다음과 동
	/*
		var message string
		message = fmt.Sprintf("Hi, $v. Welcome", name)
	*/
	return message, nil
	// 고는 멀티블 밸류를 리턴할수있다.
	// 콜러는 두번째 밸류를 볼거다 에러가 발생했는지 안 발생했는지
}

// Hellos returns a map that associates each of the named people
// with a greeting message
func Hellos(names []string) (map[string]string, error){
	// a map to sassociate names with message
	messages := make(map[string]string)

	// for문돌면서 각 이름으로 인사말 해준다
	//  인덱스를 생략하고 싶을때 _넣자 만약 i넣어줬다면 i는 0,1,2,3 식으로 표현될것임
	for _, name := range names{
		message, err := Hello(name)
		if err != nil{
			return nil, err
		}
		
		messages[name] = message;
	}
	return messages, nil
}



// init은 함수에서 쓰이는 변수를 초기화해준다
func init(){
	rand.Seed(time.Now().UnixNano())
}

// randomFormat 함수는 인사말중 하나를 랜덤으로 선택해서 리턴함
func randomFormat() string{
	formats := []string{
		"Hi, %v. Welcome!",
		"Great to see you, %v!",
		"Hail!?? %v Well met!",
	}

	// 랜덤하게 선택된 메시지를 리턴
	// 랜덤 인덱스에 의해서 선택됨
	return formats[rand.Intn(len(formats))]
}