


/*
//연산자 오버로딩 더 파기 
//연산자 오러로딩 불가 연산자 .  ::    ?:     sizeof     typeid      static_cast     dynamic_cast    const_cast     reinterpert_cast    등 

#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
	static int count; // 클래스정적멤버변수 선언
public:
	Complex(int r=0, int i=0); // 깊은복사 얕은복사
	
	//일반적으로 Complex x(10,20);
	// Complex y = x; 로 y를 x로 초기화시키면 얕은복사가 일어난다 이건 그 this->real = &temp.real  아무튼 주소를 주게되서 x소멸자가 호출되면 y소멸자가 지울게 없어서 아무튼 할게없어짐
	//깊은 복사가 필요해짐 그 거는 이렇게 하면됨
	Complex(const Complex &temp){
		// 문자열의 경우는 strcpy_s(this->real, temp.real);
		//클래스는 이렇게 하면되나?
		Complex::count++;
		cout << Complex::count<<" 번째생성자 호출 깊은복사"<<endl; // 아직 모르겠다 ㅎㅎ 이거 어떻게 하지
		real = temp.real;
		image = temp.image; // 아 주소로 * 라든가 & 라든가   로 복사생성자는 얕은복사하면은 참조값자체가 복사되서 새로생기는게아님   깊은거는 참조되는 그 객체 자체를 복사하는거라 암튼 그럼 ㅎ]
		// 근데 소멸자 왜 호출안되냐
		
	
		//this->real = new temp.real; 모르겠다.
		//this->image = new temp.image;
		
	}
	~Complex()
	{
		cout << Complex::count <<" 번째 소멸자 호출" << endl;
		Complex::count--;
	}
	void SetComplex(int r = 0, int i = 0);
	void PrnComplex()const;

	//여기부터 연산자 오버로딩
	//후위 증감 전위 증감 정의 
	friend Complex &operator++(Complex &cObj); // 전위   ++test
	friend const Complex operator ++(Complex &cObj, int); // 후위 test++

	friend Complex &operator--(Complex &cObj); // 전위 --
	friend const Complex operator--(Complex &cObj, int);
	
};
int Complex::count = 0; //클래스정적 멤버변수 정의
Complex::Complex(int r, int i)
{
	Complex::count++;
	cout << Complex::count<<" 번째 생성자 호출" << endl;
	this->real = r; 
	this->image = i; 
	
}
void Complex::SetComplex(int r, int i)
{
	real = r; 
	image = i;
}
void Complex::PrnComplex() const
{
	cout << this->real << "." << this->image << "i" << endl;
}
Complex &operator++(Complex &cObj)
{
	cObj.image++;
	cObj.real++;
	return cObj;
}
const Complex operator ++(Complex &cObj, int)
{
	Complex temp = cObj;
	cObj.real += 1;
	cObj.image += 1;
	return temp;
}
Complex &operator--(Complex &cObj)
{
	cObj.real++;
	cObj.image++;
	return cObj;
}
const Complex operator--(Complex &cObj, int)
{
	Complex temp = cObj;
	cObj.real += 1;
	cObj.image += 1;
	return temp;
}


void main()
{
	Complex x(1, 2), y(4, 6), z = x;
	//x.PrnComplex(); // 잘 작동한다.
	//x++.PrnComplex();
	//x.PrnComplex();
	//(++x).PrnComplex();
	
	Complex q;
	system("pause");
	return;
}
*/




/*
// string class << 가능하게 예제
#include <iostream>
#include <string.h>
using namespace std;
class Cstring {
private:
	char data[256];
public:
	Cstring(const char *nul = "\0") {
		strcpy_s(data, nul);// 생성자로 초기화
	}
	friend ostream &operator<<(ostream &os, const Cstring &right) ;
};
ostream &operator<<(ostream &os, const Cstring &right)
{
	os << right.data;
	return os;
}
void main()
{
	Cstring Astr("ghh0");
	Cstring Bstr("asdsad");

	cout << Astr << endl; // 요거를 가능하게 << 를 오버로딩
	cout << Bstr << endl;

	system("pause");
	return;
}
*/



/*
//실제 연산자로 한번 해보자 operator- +
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int r = 0, int i = 0);
	void ShowComplex() const; // const 멤버함수는 멤버변수들의 값을 사용만하고 변경하지 못하도록 한다.
	void SetComplex(int r=0, int i=0);
	Complex operator-(Complex &rightHand) const; 
	Complex operator-() const; // 단항연산자 -  ex)   -a
	Complex operator+(Complex &rightHand);

	// 출력담당 함수도 만들어보자 operator<<
	friend ostream &operator<<(ostream &os, const Complex &comObj) ;

	// 곱셈을 담당하는 함수도 만들어보자 operator*
	Complex &operator*(Complex &rightHand)const;
	
	
};

Complex::Complex(int r, int i):real(r), image(i)
{}
void Complex::ShowComplex() const
{
	if (image > 0)
		cout << real << ".+" << image << "i" << endl;
	else if (image < 0)
		cout << real << "." << image << "i" << endl;
	else
		cout << real << endl;
}
void Complex::SetComplex(int r, int i)
{
	real = r;
	image = i;
}
inline Complex Complex::operator-(Complex &rightHand) const // 멤버함수인데 
{
	Complex res;
	res.real = this->real - rightHand.real;
	res.image = this->image - rightHand.image;
	return res;
}
inline Complex Complex::operator-() const
{
	Complex res;
	res.real = -this->real;
	res.image = -this->image;
	return res;
}
inline Complex Complex::operator+(Complex &rightHand)
{
	Complex res;
	res.real = this->real + rightHand.real;
	res.image = this->image + rightHand.image;
	return res;
}
inline ostream &operator<<(ostream &os, const Complex &comObj) // cout << a << "i" << b<< endl;  cout << a 가 cout 반환하고   cout<<"i"<<b<<endl; 에서 반복적으로 오른쪽으로간다
{
	os << comObj.real << "." << comObj.image << "i" << endl;
	return os;
}
inline Complex &Complex::operator*(Complex &rightHand)const
{
	Complex res;
	res.real = this->real * rightHand.real;
	res.image = this->image * rightHand.image;
	return res;
}
void main()
{
	Complex x(10, 10 ), y(50, 20), z;

	cout << "x + y = z" << endl;
	z = x + y;
	z.ShowComplex();
	
	cout << "x - y = z" << endl;
	z = x - y;
	z.ShowComplex();

	cout << "z = -x" << endl;
	z = -x;
	z.ShowComplex();

	cout << "z = x*y" << endl;
	z = x * y;
	z.ShowComplex();

	

	cout << x << y << z << endl;
	system("pause");
	return;
}
*/





/*
//앞에꺼를 프랜드함수 + 레퍼런스에의한 전달 써보자 // p407 까지했다..
#include <iostream>
using namespace std;
class Complex {
private: 
	int real;
	int image;
public:
	Complex(int = 0, int = 0);
	void ShowComplex()const;
	
	friend Complex &AddOnePrefix(Complex &operand);
	friend Complex &AddOnePostfix(Complex &operand);
};

Complex::Complex(int r, int i)
{
	real = r;
	image = i;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

Complex &AddOnePrefix(Complex &operand)
{
	++operand.real;
	++operand.image;
	return operand;
}

Complex &AddOnePostfix(Complex &operand)
{
	Complex temp = operand;
	++operand.real;
	++operand.image;
	return temp;
}

void main()
{
	Complex x(1, 2), y(4, 5), xx, yy;
	
	x.ShowComplex();
	xx = AddOnePrefix(x);
	x.ShowComplex();
	xx.ShowComplex();

	y.ShowComplex();
	yy = AddOnePostfix(y);
	y.ShowComplex();
	yy.ShowComplex();

	system("pause");
	return;
}
*/






/*
// ++a   a++ 를 구현해보자  각각 멤버함수명은 AddOnePrefix    AddOnePostfix  
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int = 0, int = 0);
	void ShowComplex() const;
	 
	Complex AddOnePrefix();
	Complex AddOnePostfix();
};

Complex::Complex(int r, int i)
{
	real = r;
	image = i;

}

void Complex::ShowComplex()const
{
	cout << real << "." << image << "i" << endl;
}

Complex Complex::AddOnePrefix()
{
	++this->real;
	++this->image;
	return *this;
}

Complex Complex::AddOnePostfix()
{
	Complex temp = *this;
	++this->real;
	++this->image;
	return temp;
}

void main()
{
	Complex x(1, 2), y(5, 7), xx, yy;
	x.ShowComplex();
	xx = x.AddOnePrefix();
	x.ShowComplex();
	xx.ShowComplex();

	y.ShowComplex();
	yy = y.AddOnePostfix();
	y.ShowComplex();
	yy.ShowComplex();

	system("pause");
	return;
}
*/






/*
// Complex 더하기를 프랜드 함수로 구현
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int = 0, int = 0);
	void ShowComplex() const;
	friend Complex sum(Complex &x, Complex &y); // 프랜드 Complex의 멤버함수가 아니라 일반함수야 ㅎㅎ
};

Complex::Complex(int r, int i)
{
	real = r; image = i;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

Complex sum(Complex &x, Complex &y)
{
	Complex res;
	res.real = x.real + y.real;
	res.image = x.image + y.image;
	return res;
}

void main() {
	
	Complex x(5, 3), y(1, 6), z;
	z = sum(x, y);
	x.ShowComplex();
	y.ShowComplex();
	z.ShowComplex();

	system("pause");
	return;
}
*/




/*
//연산자 오버로딩 일단 +  - 는 나중에 하고 Complex객체끼리 더하는것을 멤버함수로 구현하자.
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int = 0, int = 0);
	void ShowComplex() const;
	Complex sum(Complex &ins);
};

Complex::Complex(int r, int i)
{
	real = r;
	image = i;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

Complex Complex::sum(Complex &ins)
{
	Complex res;
	res.real = this->real + ins.real;
	res.image = this->image + ins.image;

	return res;
}

void main()
{
	Complex x(4, 3), y(2,4), z;
	
	z = x.sum(y);

	x.ShowComplex();
	cout << " + " << endl;
		y.ShowComplex();
		cout << " = " << endl;

	z.ShowComplex();

	system("pause");
	return;
}
*/








/*
//friend functions   일반함수따위가 위대하신 클래스설계의 private에 접근할수있도록 하는 따위나 방법 ... friend 함수....   데이터은닉성은 개나줘버림. 그러니까 절대 남용하면 안됨. 
// friend functions 이 되기 위한 조건.
// 접근하고자 하는 private멤버를 갖는 클래스 내부에 friend함수를 선언한다.
// 프렌드 함수 선언할때는 함수명 앞에 다음과 같이 예약어 friend를 붙인다.
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
	static int count;
public:
	Complex(int =0, int =0);
	~Complex();
	void ShowComplex() const;
	
	friend void prn(Complex *parr); // 프랜드 함수 선언
	friend void rprn(Complex &r); // 레퍼런스로 해볼까?? // 배열 자체가 포인터의 연속이다.. 그래서 레퍼런스로는 안된다는데???ㅋㅋ
};

int Complex::count = 0;

Complex::Complex(int r, int i) : real(r), image(i)
{
	Complex::count++;
}
Complex::~Complex()
{
	Complex::count--;
}
void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

void prn(Complex *parr)
{
	for (int i = 0; i < Complex::count; i++) {
		cout << (parr + i)->real << "." << (parr + i)->image << "i" << endl;
	}
}

void rprn(Complex &r)
{
	for (int i = 0; i < Complex::count; i++)
		cout << r.real << "." << r.image << "i" << endl;
}

void main()
{
	Complex arr[6] = { //마지막 arr[5] 는 default
		Complex(4,3),
		Complex(6,4),
		Complex(1,2),
		Complex(7,3),
		Complex(0,1)
	};
		
	prn(arr); // Complex의 프랜드 함수인 prn이 Complex클래스 객체들의 private member인 real과 image를 지맘대로 가져다 썼다. 
	//rprn(arr);
	system("pause");
	return;
}
*/





/*
// 객체배열 
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
	static int count;
public:
	Complex(int real = 0, int image = 0);
	~Complex();
	void SetComplex(int, int);
	void PrnComplex() const;
	static void PrnCount();
};
int Complex::count = 0;
Complex::Complex(int real, int image)
{
	this->real = real;
	this->image = image;
	Complex::count++;
}
Complex::~Complex() // 카운트 줄여주는 소멸자 정의
{
	cout << "소멸자 호출" << endl;
	Complex::count--;
}
void Complex::SetComplex(int real, int image)
{
	this->real = real; this->image = image;
}
void Complex::PrnComplex()const
{
	cout << real << "." << image << "i" << endl;
}
void Complex::PrnCount()
{
	cout << Complex::count << "번째 생성" << endl;
}

void prn(Complex *parr) {
	// 이거 배열 다 출력하는 함수 선언, 정의
	for (int i = 0; i < 5; i++)
		(parr + i)->PrnComplex();
}
void main()
{
	Complex arr[5] = { // 10A 11B 12C 13D 14E 15F -> 0
		Complex(4,5),
		Complex(8,34),
		Complex(7,12),
		Complex(3,4)
	}; // 마지막 4번째꺼는 초기값주자
	Complex *parr = arr; // *parr 선언 후 arr배열의 시작주소 대입 
	Complex::PrnCount();

	for (int i = 0; i < 5; i++) { // arr[0] 1000 번지라고 치면    arr
		arr[i].PrnComplex(); // 만약 *parr 포인터 선언후 사용하려면 *(parr+i)->PrnComplex(); 해주면 됨 실험은 밑에
	}
	for (int i = 0; i < 5; i++) {
		(parr + i)->PrnComplex();
		(arr + i)->PrnComplex();
		cout << "\n parr+i 의 주소값"<< (&parr+i);
		cout << "\n arr+i 의 주소값" << arr + i << endl;
		
	}
	prn(arr); // prn 함수 호출
	system("pause");
	return;
}
*/






/*
//정적 멤버변수의 유용한 사용 예
#include <iostream>
using namespace std;
class Cstud {
private:
	char name[20];
	char handphone[30];
	char email[40];
	//static int count; //정적멤버변수 count 선언
	static int count;

public:
	static void PrnCount(); // static 붙여줘야 인스턴스 없을때도 Cstud::PrnCount로 호출이 됨 
	Cstud( char const pname[20] = "null", char const phandphone[30] = "010-0000-0000", char const pemail[40] = "null@naver.com");
	void PrintStud()const; //콘푸로스트
};

int Cstud::count = 0; // 정적멤버변수 count 0으로 초기화

Cstud::Cstud(char const pname[20], char const phandphone[30], char const pemail[40])
{
	strcpy_s(name, pname);   // 이야 _s 정말 안전하다 
	strcpy_s(handphone, phandphone);
	strcpy_s(email, pemail);
	Cstud::count++;
	cout << "현재 " << count << endl;
}
void Cstud::PrintStud()const
{
	cout << name << "\t" << handphone << "\t" << email << endl;
}
void Cstud::PrnCount()
{
	cout << "현재 count" << Cstud::count << endl;
}
void main()
{
	Cstud x("aaa","aaa","aaa"), y("bbb","bbb","bbb"), z, d;
	// cout << Csutd::count << endl; 이렇게 호출 절대 aht한다. private여서 
	//cout << Cstud::count << endl;
	x.PrintStud();
	y.PrintStud();
	z.PrintStud();
	d.PrintStud();

	x.PrnCount(); // x인스딴스를 통해서 호출
	Cstud::PrnCount(); // 클래스단위 정적멤버함수를 호출 static 을 붙여야한다
	system("pause");
	return;
}
*/





/*
// 클래스 단위 멤버와 객체 단위 멤버
//정적 멤버함수
#include <iostream>
using namespace std;
class StaticTest {
private:
	static int a;
	int b;
public:
	StaticTest();
	static void SetA(int new_a);
	static int  GetA();
};
int StaticTest::a = 10;
StaticTest::StaticTest() {
	b = 20;
}
void StaticTest::SetA(int new_a) {
	a = new_a;
}
int StaticTest::GetA() {
	return a;
}

void main()
{
	StaticTest x;
	x.SetA(1002);
	cout << x.GetA() << endl;
	cout << StaticTest::GetA() << endl;
	
	system("pause");
	return;
}
*/


/*
#include <iostream>
using namespace std;
class StaticTest {
public:
	static int a; // 클래스 단위 멤버 변수 선언
	int b; // 객체 단위 멤버 선언
	StaticTest();
};

int StaticTest::a = 0; // 클래스 단위 멤버 변수 초기화는 클래스 선언문 밖에다가 정의해줘야함.

StaticTest::StaticTest()
{
	b = 20;
}

void main()
{
	cout << "StaticTest::a => " << StaticTest::a << "\n\n";

	StaticTest s1, s2;

	cout << "s1.a -> " << s1.a << "\t s2.a -> " << s2.a << "\n";
	cout << "s1.b -> " << s1.b << "\t s2.b -> " << s2.b << "\n\n";

	s1.a = 100;

	cout << "s1.a -> " << s1.a << "\t s2.a -> " << s2.a << "\n";
	cout << "s1.b -> " << s1.b << "\t s2.b -> " << s2.b << "\n\n";

	s1.b = 200;
	cout << "s1.a -> " << s1.a << "\t s2.a -> " << s2.a << "\n";
	cout << "s1.b -> " << s1.b << "\t s2.b -> " << s2.b << "\n\n";

	system("pause");
	return;
}
*/


/*
// 아래에 대한 예제
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int r = 0, int i = 0);
	void ShowComplex()const;
};

Complex::Complex(int r, int i)
{
	real = r;
	image = i;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

Complex &CopyComplex(Complex &dst, const Complex &src)
{
	dst = src;
	return dst;  // 이게 Complex &CopyComplex = (return)dst  식으로 되나봄   아마..
}

void main()
{
	Complex x(10, 20), y(40, 50), z;
	x.ShowComplex();
	y.ShowComplex();
	z.ShowComplex();
	cout << endl;
	z = CopyComplex(y, x);
	x.ShowComplex();
	y.ShowComplex();
	z.ShowComplex();

	system("pause");
	return;
}
*/



/*


Complex CopyComplex(Complex &dst, Complex &src) {
// 이거 반환하려고하면 CopyComplex내에 dst를 저장할 공간을 만든다. 그러면 낭비다 그러니까
return dst
}



Complex &CopyComplex(Complex &dst, Complex &src) { // 여기 Complex &CopyComplex 가 보이는가. & 붙이면은   &dst   그러니까 main::y  의 별칭으로 CopyComplex가 생기는거다 
// 그러면 main::y 의 별칭은 총    CopyComplex::dst      CopyComplex()   가 되는거다                        암튼 그러면은 리턴을 위해 별다른 공간을 낭비하지않는다
return dst
}
*/

/*
//레퍼런스에 의한 CopyComplex 함수 김구현
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int real = 0, int image = 0);
	void ShowComplex() const;
};

Complex::Complex(int real, int image)
{
	this->real = real; this->image = image;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

void CopyComplex(Complex &dst, const Complex &src)  // 이 함수내에서 src레퍼런스객체 내부의 값이 변경되면은 안되므로 const 예약어 붙여준다. const Complex &src     마치 const int num = 0; 같이 ㅎㅎ 만약에 함수 내부에서 변경될라고하면 오류난다.ㅎ
{
	dst = src; // 만약에 이 함수 리턴값 만들면은  이 함수 내부에서   이 리턴값을 위한 Complex객체 공간이 하나 생긴다 이것도 일종의 낭비라고볼수있음. 그러니까. 위에 주석 달아놓겠음

}

int main()
{
	Complex x(10, 20), y(50, 60);
	x.ShowComplex();
	y.ShowComplex();
	cout << "Copy Complex() 호출후 " << endl;
	CopyComplex(y, x);
	x.ShowComplex();
	y.ShowComplex();
	system("pause");
	return 0;
}
*/



/*
// 값에 /*의한 전달을 받아 서로 바꾸는 CopyComplex(Complex src, Complex dst) 는 역시나 안된다 역시. 객체 주소로 넘겨줘야 작동한다. 레퍼런스로도 되나? 된다
//일단 값에 의한 전달로 CopyComplex를 할려면은 무식하게 리턴값으로 암튼해야한다 

#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int real = 0 ,int image = 0);
	void ShowComplex() const;
};

Complex::Complex(int real, int image)
{
	this->real = real; this->image = image;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

void CopyComplex(Complex *pdst, Complex src)  // 거의 function(dst, src) 인가보네
{
	*pdst = src;
}

int main()
{
	Complex x(10, 20), y(30, 40);
	x.ShowComplex();
	y.ShowComplex();

	cout << "CopyComplex(&y,x)" << endl;
	CopyComplex(&y, x);
	x.ShowComplex();
	y.ShowComplex();

	system("pause");
	return 0;
}
*/




/*
//매개변수가 객체인 함수.
// 동일한 자료형으로 선언된 객체끼리는 대입연산자로 값을 치환 가능하다.
#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int r = 0, int i = 0);
	void ShowComplex() const;
	void SetComplex(int ,int);
};

Complex::Complex(int r, int i)
{
	real = r;
	image = i;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

void Complex::SetComplex(int r, int i)
{
	real = r;
	image = i;
}

void main()
{
	Complex x(10, 20), y(50, 60);
	x.ShowComplex();
	y.ShowComplex();
	cout << "대입하면" << endl;
	y = x;
	x.ShowComplex();
	y.ShowComplex();
	cout << "Y 새로 입력하면" << endl;

	y.SetComplex(1, 2);
	x.ShowComplex();
	y.ShowComplex();
	
	system("pause");
}
*/



/*
// 객체는 자료형이 클래스라는거빼고는 다른 일반 변수와 동일하다. 그러니꺄 포인터도 있다. 객체 포인터        
// 클래스의 멤버함수는 해당 클래스객체들이 공유하는거임 그러면 함수 내의 멤버변수들이 어떤 객체소속인지를 어떻게 아나..
// 그거는 컴파일러에 의해 생성되는 this 포인터 사용해서 한다. this 는 "멤버함수를 호출한 객체의 주소" 임 암튼 컴파일러가 알아서 this -> real = 4;   this->image = 3; 이런 형식으로 알아서 해줌 this 는 멤버함수 내에서만 사용가능함.
// 멤버함수내에 this 포인터가 있다. this 를 꼭 사용해야 하는 경우는   함수의 매개변수와 멤버변수의 이름이 똑같을때이다.
//this 를 한번 쓸때없이 명시적으로 사용해보자

#include <iostream>
using namespace std;
class Complex {
private:
	int real;
	int image;
public:
	Complex(int real = 0, int image = 0);
	void ShowComplex() const;
};

Complex::Complex(int real, int image)
{
	this->real = real;
	this->image = image;
}

void Complex::ShowComplex() const
{
	cout << this->real << "." <<this->image << "i" << endl;
}

int main()
{
	Complex x(4,2);
	x.ShowComplex();

	system("pause");
	return 0;
}

*/





/*
#include <iostream>
using namespace std;
class Crect {
private:
	int left;
	int top;
	int right;
	int bottom;
public :
	void print()const;
	void setRect(int ,int ,int ,int	);
};

void Crect::print() const {
	cout << left << " " << top << " " << right << " " << bottom << endl;

}

void Crect::setRect(int l, int t, int r, int b) {
	left = l;
	top = t;
	right = r;
	bottom = b;
}

int main()
{
	Crect obj_1;
	

	obj_1.setRect(1, 2, 3, 4);
	obj_1.print();

	system("pause");
	return 0;
}
*/




/*
#include <iostream>
using namespace std;
class Crect {
private:
	int left;
	int top;
	int right;
	int bottom;
public:
	Crect(int t0 = 0, int t1 = 0, int t2 = 0, int t3 = 0);
	~Crect();
	void input(int,int,int,int);
	void print()const;
};

void Crect::print()const {
	cout << left << " " << top << " " << right << " " << bottom << endl;

}

void Crect::input(int t0, int t1, int t2, int t3) {
	
	left = t0;
	top = t1;
	right = t2;
	bottom = t3;
}
Crect::Crect(int t0, int t1, int t2, int t3)
{
	cout << "생성자 호출" << endl;
	left = t0;
	top = t1;
	right = t2;
	bottom = t3;
}
Crect::~Crect()
{
	cout << "소멸자 호출" << endl;
	system("pause");
}
void main() {
	Crect obj_1, obj_2;
	obj_1.input(1, 2, 3, 4);
	obj_2.input(5,3,4,5);
	
	obj_1.print();
	obj_2.print();

	system("pause");
	return;
}
*/



//여기부터 예제


/*
//소멸자. Destructor 소멸자는 객체가 소멸할때 자동호출  
// 생성자가 객체를 초기화하기 위한 멤버함수라면 소멸자는 객체를 정리해 주는 (리소스)를 해제한다든지 하는 작업을 하는 멤버함수이다 . 예라이
// cpp 컴파일러가 소멸자도 제공해주는데 생성자와 똑같이 아무것도 안하는 소멸자라서  객체를 해제할때 꼭 해야할일이 있으면 명시적으로 정의해줘야한다. ㅎ소멸자는 매개변수 지정 X 오버로딩 X  ~붙이면 된다 클래스이름 앞에

#include <iostream>
using namespace std;

class Complex
{
private :
	int real;
	int image;
public :
	Complex(int r = 0, int i = 0);
	~Complex();
	void ShowComplex() const;
};

Complex::Complex(int r, int i)
{
	real = r;
	image = i;
}

Complex::~Complex()
{
	cout << "소멸자 호출" << endl;
	system("pause");

}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

void main()
{
	Complex x(40, 20), y(2), z;
	x.ShowComplex();
	y.ShowComplex();
	z.ShowComplex();

	
	system("pause");
	return;
}
*/



/*
//콜론초기화 ;; 이거는 보기는 좋겠지만;;좀 그렇네
#include <iostream>
using namespace std;
 
class Complex {
private:
	int real;
	int image;
public :
	Complex(int r = 0, int i = 0);
	void ShowComplex()const;
};

Complex::Complex(int r, int i) : real(r), image(i) // 보기 쪼금 그렇다.
{

}
*/


/*
#include <iostream>
using namespace std;

class Complex
{
private :
	int real;
	int image;
public :
	Complex(int r = 0, int i = 0); // 이렇게 할수도 있다 . 이렇게 하면 생성자 구지 오붜로뒹 해서 여러게 만들필요가 사라질수도있다 ㅎ
	void ShowComplex() const;
};

Complex::Complex(int r, int i)
{
	real = r;
	image = i;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

void main()
{
	Complex x(40, 20), y(4), z;

	x.ShowComplex();
	y.ShowComplex();
	z.ShowComplex();

	
	system("pause");
	return;
}

*/




/*
#include <iostream>
using namespace std;
class Complex
{
private:
	int real;
	int image;
public :
	Complex();
	Complex(int r, int i);
	void ShowComplex() const;
};

Complex::Complex() // 와.. 이런 실수를 하다니...     생성자 정의부분에 int real = 0; 이라고 함수안에 변수를 또 선언했었네 와 이러니까 쓰레기값나오지 , 하..
{
	real = 0;
		image = 0;
}

Complex::Complex(int r, int i)
{
	real = r;
	image = i;
}
void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

void main()
{
	Complex x(10, 20);
	Complex y(30, 40);
	Complex z;
	x.ShowComplex();
	y.ShowComplex();
	z.ShowComplex();

	system("pause");
	return;
}

*/




/*
// 매개변수를 갖는 생성자
#include <iostream>
using namespace std;
class Complex
{
private: 
	int real;
	int image;
public:
	Complex(int r, int i);
	Complex();
	void ShowComplex() const;
};

Complex::Complex(int r, int i)
{
	real = r;
	image = i;
}


Complex::Complex()
{
	real = 0;
	image =0;
}

void Complex::ShowComplex() const
{
	cout << real << "." << image << "i" << endl;
}

void main()
{
	Complex x(4,7), y;

	x.ShowComplex();
	y.ShowComplex();
	
	system("pause");
	return;
}
*/






/*
//ㅅ생성자 컴파일러에서 디폴트 생성자를 자동으로 생성해주지만. 이거는 쓰레기값만 생겨서 명시적으로 해야할거는 생성해야한다.
#include <iostream>
using namespace std;
class Complex
{
private:
	int real;
	int image;
public:
	Complex(); //생성자 선언
	void ShowComplex() const;
};          

Complex::Complex() // 생성자 정의
{
	real = 5;
	image = 20;
}

void Complex::ShowComplex() const // const로 ShowComplex내부에서 Complex 클래스 내부값 못바꾸게
{
	cout << real << "." << image << "i" << endl;
}

int main()
{
	Complex x; // x라는 객체를 만들때 생성자 실행.

	x.ShowComplex();

	system("pause");
	return 0;
}
*/







/*
#include <iostream> //default initialize experiment of functions
using namespace std;
void print(int x = 99, int y = 99, int z = 99) {
	cout << x << " " << y << " " << z << endl;
	return;
}


void main() {
	

	print(1, 2, 3 );
	print(5, 6);
	print(7);
	print();

	system("pause");
	return;
}*/
/*
void print(int x, int y, int z) { // 함수의 디폴트 초기값은 무조건 선언부에다 해줘야댄다. 여기다가 써버리면 오류난다. 이문장 주석 해제해도 작동한다. 
	cout << x << " " << y << " " << z << endl;
	return;
}// 내말은 여기다가 void print(int x=99 이런짓 하지말란얘기다
*/




/*
//매개변수의 갯수가 다른 오버로딩
#include <iostream>
using namespace std;
inline void print(int);
inline void print(int, int);
inline void print(int, int, int);

void main() {
	
	int a = 10, b = 20, c = 30;
	
	print(a);
	print(a, b);
	print(a, b, c);
	system("pause");
	return;
}
inline void print(int num) {
	cout << num << endl;
}
inline void print(int num, int num2) {
	cout << num << " " << num2 << endl;
}
inline void print(int num, int num2, int num3) {
	cout << num << " " << num2 << " " << num3 << endl;
}
*/





/*
#include <iostream> // 매개변수의 자료형이 다른 overloading
using namespace std;

void absolute(int num);
void absolute(double num);
void absolute(long int num); // long 자료형 long int 라고도 하는구나.. 다른가.

int main() {
	
	for (int i = 0; i < 3; i++) { // 세가지의 실험을 해보자 생각해보니까 이 for문은 개지랄이다.
		
		switch (i) {
		case 0:absolute(-3); break;
		case 1:absolute(-4.2); break;
		default: absolute(-403000000); break;
		}
		
	}
	
	system("pause");
	return 0;
}

void absolute(int num) {
	if (num < 0)
		cout << -(num) << endl;
	cout << "int 라고 인식함" << endl;
}
void absolute(double num) {
	if (num < 0)
		cout << -(num) << endl;
	cout << "double " << endl;
}
void absolute(long int num) {
	if (num < 0)
		cout << -(num) << endl;
	cout << "long int 작동댐!!!" << endl;
}
*/






/*
//함수의  signature  컴파일러가 함수를 구분하는 변수들. 1.함수의 이름 2. 매개변수의 개수 3. 매개변수의 자료형
#include <iostream> // 함수의 다형성을 알아보기 위해 코드를 작성해보았습니다.
using namespace std; // 

void printstr(const char *);
void printstr(char, int); //매개변수명을 여기서는 지정안해도 되는구나..... 아ㅏ,,,,정말?

int main()
{
	printstr("Sorry i'm sorry"); // 아 c++ 책 개 불친절하네 .    "sorry i'm sorry" 이게 문자열 상수야 상수 const 시발  그래서 출력하는 함수로 건내줄때 그 매개변수 자료형에다가 const 붙여야함 하....
	printstr('a', 4);
	system("pause");
	return 0;

}
void printstr(const char *the_string) {
	cout << the_string << endl;
}
void printstr(char the_char, int repeat_cnt) { // 하면서 느낀게 영어.. 어원 root 를 조금 학습해야겠다... 그말이아..
	for (int i = 0; i < repeat_cnt; i++)
		cout << the_char << endl;

}
*/






/*
//class 선언
#include <iostream>
using namespace std;
class Complex // Complex 클래스 선언
{
private: 
	int real;
	int image;

public:
	void SetComplex(); // public Complex 클래스 멤버함수 선언
	void ShowComplex() const; // ShowComplex 함수는 객체 내부의 값을 아무것도 변경하면 안되는 함수이다 그러므로 const 예약어를 앞에다 쳐줘야한다.
	inline void SetReal(int r); // real image에 직접 값을 입력할수있게 한다.
	void SetImage(int i); // 만얀에 여기 안에다가 정의까지하면 그것은 inline 함수가 된다. 짧은 함수일때는 inline 해줘야 빠른접근 등 해서 암튼 효율이 좋다 대신 큰거면은 프로그램의 용량이 커진다. 명시적으로 inline 적어줘도 된다.
};

void Complex::SetComplex() {
	real = 3;
	image = 6;
}
void Complex::ShowComplex() const {
	cout << "print Complex " << endl;
	cout << real << "." << image << "i" << endl;
}
inline void Complex::SetReal(int r) {   // 요따가 inline 적어주면 된다.
	real = r;
}
void Complex::SetImage(int i) {
	image = i;
}
int main()
{
	Complex x, y;

	x.SetComplex();
	y.SetComplex();
	
	y.SetReal(1);
	y.SetImage(2);

	x.ShowComplex();
	y.ShowComplex();

	system("pause");
	return 0;
}
*/



// 구조체 배열을 call by reference 로 함수로 전달 가능하다 이렇게
/*
void func(structTest (&ref)[100] // 이게 포인터가 아니라 레퍼런스라서 꼭 배열의 크기를 명시해줘야함.
{
refer[0].weight = 10;
}

func(test)   // 호출 call
*/




/*
1. 성적을 관리하기 위한 구조체를 선언하라 구조체 이름 stuRecord > 멤버변수 name kor eng mat tot ave
2. 1번 문제에 초기값 주고 총점과 평균을 구하고(3. 이걸 또 함수로 만들어라 ㅎㅎ) 이를 출력하래 4. 출력도 함수로 하라 prn 5.입력도 init 함수 선언 할수있게 그냥 종합적으로 만들라 이얘기네 ㅎㅎ 애들은 구조체 배열로
*/
/*
#include <iostream>
#define headnum 3
using namespace std;
struct sturecord {
	char name[20];
	int kor;
	int eng;
	int mat;
	int tot;
	double ave;
};

void init(sturecord *p, int num);
void cal(sturecord *p, int num);
void prn(sturecord *p, int num);

int main() {

	sturecord a[headnum]; // a라는 레코드구조체 배열 선언 
	
	init(a, headnum); //init 호출
	prn(a, headnum); //prn 호출 사실 headnum 매크로상수로 선언해서 함수 매개변수에 끼워넣을 필요는 없는데 그냥 기분내서 넣음.

	system("pause");
	return 0;
}

void init(sturecord *p, int num) {
	cout << endl << " init 함수 호출0번째는 초기화해줌 ㅎㅎ" <<endl;
	strcpy_s(p[0].name, "홍길동");
	p[0].kor = 82;
	p[0].eng = 93;
	p[0].mat = 91;

	for (int i = 1; i < headnum; i++) {
		cout <<"\n"<< i << endl;
		cout << "이름 입력";
		cin >> p[i].name;
		cout << "\n국어 입력";
		cin >> p[i].kor;
		cout << "\n영어 입력";
		cin >> p[i].eng;
		cout << "\n수학 입력";
		cin >> p[i].mat;
	}
	cout << endl << "계산 시작 cal() 함수 호출"<<endl;
	cal(p, headnum);
	cout << endl << "main 함수로 복귀" << endl;
	return;
}

void cal(sturecord *p, int num) {
	for (int i = 0; i < headnum; i++) {
		p[i].tot = p[i].kor + p[i].eng + p[i].mat;
		p[i].ave = (double)((double)(p[i].tot) / 3);
	}
	cout << endl << "계산 끝 init()함수로 복귀";
	return;
}

void prn(sturecord *p, int num) {
	cout << endl << "prn 함수 호출... 학생의 성적이다." << endl;
	cout << "\t이름\t국어\t영어\t수학\t총점\t평균\n";
	for (int i = 0; i < headnum; i++) {
		cout << "\t" << p[i].name << "\t" << p[i].kor << "\t" << p[i].eng << "\t" << p[i].mat << "\t" << p[i].tot << "\t" << p[i].ave << "\n";
	}
	
	cout << "\n메인으로 복귀\n";
	return;
}
// 후 씨foot힘들었다
*/