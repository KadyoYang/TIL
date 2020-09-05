
/*
// 프로그램이 예외상황을 맞이했을때 오류가났을때  툭 꺼지면 굉장히 기분 나쁘다./
// 그래서 중간에 예상치 못한 에러가나도 프로그램을 그래도 잘 돌아가야한다. 그래서 예외처리있어야함 
// 예제로 나누기 프로그램을 짜보자

#include <iostream>
using namespace std;

void main()
{
	int a, b, c, d;
	
	cout << "나눗셈을 하기 위해서 데이터를 입력하시오" << endl;

	cout << "나누는 수 피젯수 입력" << endl;
	cin >> a;

	cout << "나누는 수 젯수 입력" << endl;
	cin >> b;

	c = a / b;//값
	cout << "값 = " << c << endl;
	d = a % b; // 나머지
	cout << "나머지 = " << d << endl;

	return;
}
// 0으로 나누면 꺼진다.
// c++은 예외를 검사하고 처리하는데 사용하는 구문으로 try-catch 를 제공한다. 
// 예외가 발생할 만한 내용을 try 블록안에 기술하고
// 검사해서 예외가 발생하면 catch 구문 안의 예외 처리 구문을 수행하도록 한다.
*/


/*
try{
	예외가 발생할 만한 코드
	}

catch{해당_Exception e) {
	예외처리를 위한 루틴
	}
	
*/
// 그리고 throw 예외객체;    는 프로그래머가 의도적으로 예외를 발생시키고자 할때 사용한다.

//다음 예제는 throw 절을 이용해 의도적으로 예외를 발생시키고 발생한 예외를 try catch 구문으로 처리하는 프로그램


/*
#include <iostream>
using namespace std;

void main()
{
	int a, b, c, d;

	cin >> a;
	cin >> b;

	try {
		if (b == 0) {
			throw b; // 해당 b가 0이면 0을 던진다.
		}
		c = a / b;
		d = a % b;
		cout << c << "." << d << endl;
	}

	catch (int ex) {
		cout << ex << "로 나누려는 시도가 있었으므로 예외 발생" << endl;
	}

	cout << "예외가 있어도 정상종료됨 ㅎ" << endl;
	return;
}

*/




/*
#include <iostream>
using namespace std;

// divide 함수 내에서 오류처리하기, 아니면 호출한 함수로 오류를 전달하기.
//호출한 함수에 예외 전달하기

void divide(int a, int b)
{
	int c, d;
	cout << "********divide 함수********" << endl;

	if (b == 0)
		throw b;
	c = a / b;
	d = a % b;
	cout << " 몫=" << c << " 나머지=" << d << endl;
	
}


void main()
{
	
	try {
		divide(10, 3);
		divide(20, 0);
		divide(30, 4);

	}
	catch(int ex){
		cout << " 예외발생 " << ex << "로 나누려는 시도" << endl;
	}

}
*/



/*
// 그러면 함수 내부에 try catch 절을 divide 함수 내부에 전무 옮겨보자
#include <iostream>
using namespace std;

void divide(int a, int b)
{
	int c, d;
	cout << "**********divide 함수*******" << endl;
	try 
	{
		if (b == 0)
			throw b;
		c = a / b;
		d = a % b;
		cout << "몫" << c << " 나머지" << d << endl;
	}
	catch (int ex)
	{
		cout << ex << "로 나누려는 시도 오류발생" << endl;
	}

}

void main()
{
	divide(10, 3);
	divide(12, 0);
	divide(13, 2);

	cout << "0으로 나누더라도 정상종료됨 ^^" << endl;
}
*/





/*
// try 구문 내부에서 발생하는 예외가 다양할 수 있으므로 여러 종류의 예외를 처리하기 위해서 하나 이상의 catch문을 기술할 수 있다.
#include <iostream>
using namespace std;

void func(int a)
{
	try {
		if (a == 0)
			throw "변수의 값이 0이다아아";
		else
			throw a;
	}
	catch (const char *str){ // const 안해주면 오류뜸
		cout << str << endl;
	}
	catch (int ex) {
		cout << "숫자 " << ex << "로 인한 예외 발생" << endl;
	}

}


void main() {

	func(10);
	func(20);
	func(0);

}

*/



/*
//함수에 예외 발생 명시하기
// 예외가 발생할 가능성이 있는 함수에서 예외를 직접 처리하지 않고 호출한 함수로 옮길수 있는 예외 자료형을 정의하면서
// 명시적으로 나타낼수있다. 
#include <iostream>
using namespace std;

void func(int a) throw(const char *, int) // 떤지고자 하는걸 여기다가 기술해놓는다. 자료형만.
{ // 위의 throw절은 컴파일러에게 이러한 예외 상황이 발생할수있다는 것을 명시적으로 알려준다.
	// try 구문은 컴파일러가 꼼꼼하게 살펴보는곳이라서 너무 남용하면 프로그램 느려터진다.
		if (a == 0)
			throw "변수의 값이 0이다";
		else
			throw a;
	
	
}


void main()
{

	try {


		func(10);
		func(0);
	}



	catch (const char *str) {
		cout << str << endl;
	}
	catch (int ex) {
		cout << "숫자" << ex << "예외발생" << endl;
	}
}
*/