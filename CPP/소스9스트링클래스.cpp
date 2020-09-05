
/*

#include <iostream>
#include <string>
using namespace std;

void main()
{
	char strA[100] = "Apple";
	char strB[100];
	char strC[100];

	// strB = "Banana"; // 에러

	strcpy_s(strB, "Banana");

	//strC = strA + strB; // 에러

	strcpy_s(strC, strA);
	strcat_s(strC, strB);

	cout << "두 문자열의 합";
	cout << strC << endl;

	cout << strC[2] << endl; // it's difficult... difficult.... lemon difficult

}

*/




/*
// c++이 기본적으로 제공해주는 string class
#include <iostream>
#include <string>
using namespace std;

void main()
{
	string strA("Apple");
	string strB;
	string strC;

	strB = "Banana";

	strC = strA + strB;

	cout << strC << endl;

	cout << strC[2] << endl;
}
*/




// mystring class 설계

// 문자열 배열은 고정된 메모리구조를 일단 할당하고 쓰는거기때문에 메모리가 낭비됨.
// 할당된 메모리를 지나서 저장할수도잇어서 위험하다. 오버플로우같은거                                           

// 설계할 클래스는 필요한 만큼의 메모리만 할당되도록 설계. 이를 위해서는 동적메모리 할당이 필요-



// 동적 메모리 할당을 하는 클래스 구현을 위해서는    
// 문자열의 길이를 정수형의 멤버변수 int  m_nLen 과
// 할당한 힙 영역을 가리킬 문자포인터형 char * m_pStr  이 필요하다.  

// 다시말하면    어떤곳인가 그리고 얼마나 긴가.. 그거다.. 언더르스툳?

// 그리고 포인터에서 const는   
// const int *p 일때 *p는 정수형상수만 가르킨다는 의미임    
// p = &a 하면    a를 바꿀수없음.
// p = &b 이건 됨.. /
// 다시말해서 가리키는대상의 값은 못바꾸는데    가리키는 대상은 바뀔수있어.

// 그러면 자료형 뒤에 붙으면은???
// int* const p = &a 는   위엣거의 반대다
// 가리키는 대상은 못바꾼다... a 고정이다. 
// 근데 값은 바꿀수있다. 암튼 그런거다.






/*
#include <iostream>
#include <string>
using namespace std;

class MyString {
private:
	int m_nLen;
	char *m_pStr;
public:
	MyString(const char* const str);
	MyString();
	~MyString();
	friend ostream &operator<<(ostream & os, MyString & temp); // ostream의 << 오버로딩
	MyString &operator=(const MyString & RightHand); 
	// 같은 클래스형이나 그런경우는 기본 = 연산자를 제공해준다. 이 클래스에도 안보이지만 있는거다.
	// 이거는 얕은복사라서 다시 정의해줘야한다.
	MyString operator+(const MyString & RightHand);
	MyString(const MyString & src); // 복사 생성자 정의
	char operator[](int num);
	bool operator==(const MyString &RightHand);
	bool operator==(const char* RightHand);
}; 



bool MyString::operator==(const char* RightHand) {
	if (strcmp(m_pStr, RightHand) == 0) {
		return true;
	}
	else
		return false;
}
bool MyString::operator==(const MyString &RightHand) {
	if (strcmp(m_pStr, RightHand.m_pStr) == 0) {// strcmp는 두 값이 같으면 flase를 반환함
		return true;
	}
	else
		return false;
}
char MyString::operator[](int num) {
	if (num >= m_nLen){
		return m_pStr[m_nLen - 1];
	}
	else {
		return *(m_pStr + 1);
	}
}
MyString MyString::operator+(const MyString & RightHand) {
	int tot_len = m_nLen + RightHand.m_nLen - 1;
	char * temp = new char[tot_len];
	strcpy(temp, m_pStr);
	strcat(temp, RightHand.m_pStr);

	MyString result(temp);
	delete[] temp;
	return result;
}
MyString &MyString::operator=(const MyString &temp) {
	if (this == &temp)
		return *this;
	
	delete[]m_pStr;
	this->m_nLen = strlen(temp.m_pStr) + 1;
	this->m_pStr = new char[this->m_nLen];
	strcpy(this->m_pStr, temp.m_pStr);
	return *this;
}
MyString::MyString(const MyString & src) {
	m_nLen = src.m_nLen;
	m_pStr = new char[m_nLen];
	strcpy(m_pStr, src.m_pStr);
}
MyString::MyString(const char* const str) {
	m_nLen = strlen(str) + 1;
	m_pStr = new char[m_nLen];
	strcpy(m_pStr, str);
}
MyString::MyString() {
	m_nLen = 1;
	m_pStr = new char[m_nLen];
	strcpy(m_pStr, "");
}
MyString::~MyString() {
	delete[] m_pStr;
	m_nLen = 0;
	m_pStr = NULL;
}
ostream &operator<<(ostream &os, MyString & temp) {
	cout << temp.m_pStr;
	return os;
}


void main()
{
	MyString strA("Apple");
	MyString strB;
	cout << "test" << endl;
	cout << strA << endl;
	cout << strB << endl;

	MyString strC(strA);
	cout << strC << endl; // 잘되다가 오류뜬다 왜냐하면.. 얕은 복사이기때문... 이런 초기화는..
	// 이렇게 하면 strC(매개변수두개) 생성자가 호출이 안되고 디폴트복사생성자가 ㅎ로출된다.
	// 컴플렉스에 예를 들어서보면

	// 디폴트 복사 생성자 안에서는 이런 작업이 일어난다.
	// two.real = one.real;
	// two.image = one.image; 얕은 복사이다.
	// 디폴트 복사생성자를 사용하면 안되는 대표적인 예가 동적메모리 할당하는 클래스의 경우다.

	// strC(strA)하면   C m_pStr 에    A m_pStr이 가리키고 있는 주소값 넘겨줘서 같은놈을 공유하는 사태가 일어남.
	// 그리고 소멸자가 호출될때 나중에 호출된놈이 이미 해제된 힙 영역을 또 해제하려고 하는 문제가 생김.
	// 나중에 선언된 객체가 먼저 소멸되므로 strA는 뻘짓을해서 오류를 뿜게된다.

	// 우선 c++ 컴파일러가 기본적으로 제공하는 디폴트 생성자의 기본 형태를 보자.
	// 클래스명(const 클래스명 & 객체명);

	
	strB = strA; // 이것도 얕은복사 일어난다. 그리고 클래스는 동적메모리할당하는 데이터쓴다...이것도 해줘야한다.
	cout << "strB 깊은복사" << endl;
	cout << strB << endl;


	cout << "str A + str B" << endl;
	cout << strA[2];
}

*/