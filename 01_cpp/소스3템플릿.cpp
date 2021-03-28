
/*
// 둘 이상의 자료형에 대한 템플릿화

#include <iostream>
using namespace std;
// Data<TYPE, ARG_TYPE>
// 템플릿화하면 객체선언할때 조물조물 <> 안에다가 형 써넣으면 각자 그 변수에 다 대치되서 새롭게 만들어진다.
template <typename TYPE, typename ARG_TYPE>
class Data {
private:
	TYPE value;
public:
	Data(TYPE v);
	void CopyData(ARG_TYPE v);
	TYPE GetData();
};

template <typename TYPE, typename ARG_TYPE>
Data<TYPE, ARG_TYPE>::Data(TYPE v) {
	value = v;
}

template <typename TYPE, typename ARG_TYPE>
void Data<TYPE, ARG_TYPE>::CopyData(ARG_TYPE v) {
	value = v;
}

template <typename TYPE, typename ARG_TYPE>
TYPE Data<TYPE, ARG_TYPE>::GetData() {
	return value;
}
// 템플릿 클래스의 인스턴스화00

int main() {
	int a = 10;

	Data<int, int &> obj1(10);
	cout << obj1.GetData() << endl;

	obj1.CopyData(a);
	cout << obj1.GetData() << endl;


	double b = 3.4;
	
	Data<double, double &> obj2(1.5); // 조물조물 템플릿화한 클래스를 조물조물 <   > 형태만들어서 새로만든다.
	cout << obj2.GetData() << endl;
	
	obj2.CopyData(b);
	cout << obj2.GetData() << endl;

	return 0;
}
*/





/*
// 탬플릿 클래스 template <typename any>
#include <iostream>
using namespace std;

template <typename DATATYPE> // 클래스 test 를 DATATYPE이라는 이름으로 템플릿화 하겠다.
class Test {
private:
	DATATYPE value;
public:
	Test(DATATYPE v = 0);
	void SetValue(DATATYPE v);
	DATATYPE &GetValue();
};

template <typename DATATYPE>
Test<DATATYPE>::Test(DATATYPE v)
{
	value = v;
}

template <typename DATATYPE> // 함수내부에서 사용하고 있는 데이타타입에 대해서 설명하는부분 
void Test<DATATYPE>::SetValue(DATATYPE v) // SetValue함수가 템플릿클래스의 멤버함수가 되어야하므로Test<DATATYPE>:: 해준다
{
	value = v;
}

template <typename DATATYPE>
DATATYPE &Test<DATATYPE>::GetValue()
{
	return value;
}


int main()
{
	Test<int> Obj1(10); // 객체선언을 하면 템플릿 클래스에 의해서 클래스 인스턴스가 만들어진다.
	Obj1.SetValue(10); // 위에 <int> 있으면 객체가 생성되면서 클래스내부의<DATATYPE> 이 int 로 대치가 일어난다.
	cout << Obj1.GetValue() << endl;

	Test<double> Obj2(5.7);
	cout << Obj2.GetValue() << endl;

	// 이와 같이 템플릿 클래스도 여러 번 정의하는 수고를 덜고 코드를 재활용할수있게 해준다.
	return 0;
}
*/






/*
// 템플릿은 코드의 재활용  c++ 컴파일러가 제공한다.
#include <iostream>
using namespace std;

// 컴파일러에게 T는 정해지지않은 자료형이라고 미리 알려줘야함
// 반드시 함수정의부 위에 정의해야한다고함.
// 사용자가 제공하는 구조체나 클래스형도 될수있다.
template <typename T>
T abs(T num)
{
	if (num < 0) {
		num = (-num);
	}
	return num;
}
int main()
{
	int a = -10;
	cout << abs(a) << endl; 
	// int 형으로 매개변수주면
	// 템플릿함수가 그에맞게 인스턴스를 만들어서 딱딱 만들어준다.
	float b = -3.4;
	cout << abs(b) << endl;
	return 0;
}
*/





//절댓값을 구하는함수 여기서 반복되는것만 T로 대체하자
/*
#include <iostream>
using namespace std;

int abs(int num) 
{
	if (num < 0) {
		num = (-num);
	}
	return num;	
}

long abs(long num) 
{
	if (num < 0) {
		num = (-num);
	}
	return num;
}


double abs(double num) 
{
	if (num < 0) {
		num = (-num);
	}
		return num;
}

int main() 
{
	int a = -10;
	cout << "abs int = " << abs(a) << endl;

	long b= -12L;
	cout << "abs long = " << abs(b) << endl;

	double c = -3.4;
	cout << "abs double = " << abs(c) << endl;

	return 0;
}
*/





// 예제문제   이거를 템뽈릿화해라  
/*
#include <iostream>
using namespace std;
void change(int &a, int &b);
void change(double &a, double &b);

void main()
{
	int a = 10, b = 20;
	change(a, b);
	cout << a << "." << b << endl;

	double c = 10.5, d = 20.7;
	change(c, d);
	cout << c << "." << d << endl;

}

void change(int &a, int &b)
{
	int t;
	t = a;
	a = b;
	b = t;
}

void change(double &a, double &b)
{
	double t;
	t = a;
	a = b;
	b = t;
}
*/



/*
#include <iostream>
using namespace std;

template <typename DATATYPE>
void change(DATATYPE &a, DATATYPE &b);

void main()
{
	int a = 10, b = 20;
	change(a, b);
	cout << a << "." << b << endl;

	double c = 10.5, d = 20.7;
	change(c, d);
	cout << c << "." << d << endl;

}

template <typename DATATYPE>
void change(DATATYPE &a, DATATYPE &b)
{
	DATATYPE t;
	t = a;
	a = b;
	b = t;
}
*/


/*
#include <iostream>
using namespace std;

template <typename T>
class Add {
private:
	T a;
	T b;
public:
	Add(T a, T b);
	T Sum();
};

template <typename T>
Add<T>::Add(T a, T b)
{
	this->a = a;
	this->b = b;
}
template <typename T>
T Add<T>::Sum()
{
	return a + b;
}

void main()
{
	Add<int> obj(10, 20);
	cout << obj.Sum() << endl;
}
*/