package greetings

import (
	"testing"
	"regexp"
)

// 그리팅 테스트
func TestHelloName(t *testing.T) {
	name := "gabi"
	want := regexp.MustCompile(`\b` + name + `\b`)

	msg, err := Hello(name)
	if !want.MatchString(msg) || err != nil{
		t.Fatalf(`Hello("gabi") = %q, %v, want match for %#q, nil`, msg, err, want)
	}
}

// 그리팅 널값 테스트
// 헬로함수가 에러를 잘 주는지 테스팅
func TestHelloEmpty(t *testing.T){
	msg, err := Hello("")
	if(msg != "" || err == nil){
		t.Fatalf(`Hello("") = %q, %v, wat "", error`, msg, err)
	}
}
