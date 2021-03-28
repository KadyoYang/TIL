package main

import "fmt"


// 에러 테스트
type NegativeSqrtError float64

func (e *NegativeSqrtError) Error() string{
	return fmt.Sprintf("cannot Sqrt negative number: %v", float64(*e))
}

func Sqrt(x float64) (float64, error){
	if x < 0{
		var e NegativeSqrtError = NegativeSqrtError(x);
		return 0, &e
	}
	return 0, nil
}

func main(){
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}
