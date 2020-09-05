













//예제
/*
#include <iostream>
using namespace std;

class Base {
public:
	virtual void prn();
	// void prn(); // virtual 안붙이면 무조건 매개변수포인터변수의 형을 따라간다. 
};
void Base::prn()
{
	cout << "Base Prn" << endl;
}

class Derived : public Base {
public:
	void prn();
};

void Derived::prn() {
	cout << "Derived Prn" << endl;
}

void func1(Base &bRef) {
	bRef.prn();
}

void func2(Base *bPtr) {
	bPtr->prn();
}

void main()
{
	Base bObj;
	Derived dObj;
	func1(bObj);
	func1(dObj);

	func2(&bObj);
	func2(&dObj);
}
*/









/*
#include <iostream>
using namespace std;

class Parent {
protected:
public:
	void prn();
	~Parent() {}; //업캐스팅상황에서의 소멸자 문제때문에 가상함수처리함
};

void Parent::prn() {
	cout << "Parent Method" << endl;
}

class Child : public Parent {
public:
	void prn();
};
void Child::prn() {
	cout << "Child Method" << endl;
}

void main()
{
	{
		Parent pObj;
		Child cObj;
		Parent *pPtr = &cObj; // 암시적 업캐스팅 가능
		pPtr->prn();
		cObj.prn();
	}

	// Child *cPtr = &pObj; // 다운캐스팅 안됨.
	// Child *cPtr = (Child *)&pObj; 하든가 대신 오류생김
	
	Parent * pPtr = new Child; //동적할당 delete 해줘야함 하지만 업캐스팅이기때문에 파생소멸자가 호출될수있게 가상함수처리해줘야함 기반에다가
	Child *cPtr = (Child *)pPtr;
	cPtr->prn();
	pPtr->prn();

	delete pPtr;


	return;
}
*/





/*

//일반 소멸자의 문제점 클래스 업캐스팅상황때 
#include <iostream>
using namespace std;

class Base {
public:
	Base() { cout << "기반 클래스 생성자" << endl; }
	virtual ~Base() { cout << "기반 클래스 소멸자" << endl; }
};

class Derived : public Base {
public:
	Derived() { cout << "파생 클래스 생성자" << endl; }
	~Derived() { cout << "파생 클래스 소멸자" << endl;}
};

void main() {

	Base *BasePtr = new Derived; // 이렇게 new 동적할당으로 선언해준 변수는 delete 를 써서 없애야한다.
	delete BasePtr;
	
	return;
}
// 기반 클래스 생성자   하지만 결과값으로는 파생클래스 소멸자가 호출이 안된다. 왜냐하면 정적바인딩에 의해서
// 파생 클래스 생성자   BasePtr 이 Base클래스 형이기때문에 암튼 그렇다. 생성자는 문제가 없다 .
// 기반 클래스 소멸자
// 그래서 소멸자도 가상함수로 선언하여   가상소멸자를 만들어줘야한다. ~Base() 쪽에다가 virtual 만 붙여주자

*/




/*

#include <iostream>
using namespace std;

class Shape { //추상클래스는 인스턴스를 생성할수없다. 하지만 포인터 변수는 생성이 가능하다. 이와같은 성격으로 다형성을 어쩌구..
protected:
	double area;
public:
	virtual void Draw() = 0;
	virtual double GetSize() = 0;
};

class Rect : public Shape {
protected:
	int width;
	int height;
public:
	Rect(int new_width =0, int new_height=0);
	void Draw();
	double GetSize();
};
Rect::Rect(int new_width, int new_height) {
	width = new_width;
	height = new_height;
}
void Rect::Draw() {
	cout << "사각형을 그린다" << endl;
}

double Rect::GetSize() {
	int Area = width * height;
	return Area;
}


class Circle : public Shape {
protected:
	int radius;
public:
	Circle(int new_radius=0);
	void Draw();
	double GetSize();
};
Circle::Circle(int new_radius) {
	radius = new_radius;
}
void Circle::Draw() {
	cout << "원을 그린다" << endl;
}
double Circle::GetSize() {
	int Area = radius * radius * 3.14;
	return Area;
}

void CommonPrn(Shape * ptr)
{
	ptr->Draw();
	cout << "크기" << ptr->GetSize() << endl;
}

int main()
{
	Rect RectObj(8, 3);
	RectObj.Draw();
	cout << "크기" << RectObj.GetSize() << endl;

	Circle CircleObj(6);
	CircleObj.Draw();
	cout << "크기" << CircleObj.GetSize() << endl;

	CommonPrn(&RectObj); // 일반함수 CommonPrn 호출   매개변수로 Shape 포인터 변수로 받는다. 업캐스팅
	CommonPrn(&CircleObj); // 다형성 테스트 
	system("pause");
	return 0;
}

*/








// 완전 가상함수는 pure virtual function  함수의 정의 없이 함수의 유형만을 기반클래스에 선언해놓는것이다
// ex) virtual 반환 fuction() = 0;
// 완전 가상함수를 최소 한개 이상 갖는 클래스로는 객체를 생성하지못한다.
// 만약에 객체가 생성되면 함수의 정의가 없어 어떻게 동작할지 모르는 완전 가상함수를 호출할 수도 있기 때문이다. 그래서
// 이를 방지하기 위해 완전 가상함수를 가진 클래스로는 객체를 생성하지는 못하도록 하고 이를 추상클래스(Abstract Class)라고 부른다.
// 상속을 위한 기반클래스로 쓰인다.
// 파생클래스는 반드시 이 기반 클래스의 가상함수들을 오버라이딩 해야한다. 아니면 자기 자신도 추상클래스가 되어버린다.



/*
#include <iostream>
using namespace std;
class Calc {
protected:
	int a;
	int b;
public:
	Calc();
	Calc(int new_A, int new_B);
	virtual void Prn()const; // 기반 클래스에서 Prn()을 가상함수로 선언
};
Calc::Calc()
{
	a = 0;
	b = 0;
}
Calc::Calc(int new_A, int new_B)
{
	a = new_A;
	b = new_B;
}
void Calc::Prn()const
{
	cout << "Calc Prn" << endl;
	cout << a << "NulL" << b << endl;
}

class Add : public Calc{
protected:
	int c;
public:
	Add();
	Add(int new_A, int new_B);
	void Sum();
	void Prn()const;
};
Add::Add()
{
	a = 0;
	b = 0;
	c = 0;
}
Add::Add(int new_A, int new_B) : Calc(new_A, new_B)
{
	c = 0;
}
void Add::Sum()
{
	c = a + b;
}
void Add::Prn()const
{
	cout << "Add Prn" << endl;
	cout << a << "+" << b << "=" << c << endl;
}


int main()
{
	Calc *CalcPtr;
	Add AddObj(3, 10);
	CalcPtr = &AddObj; // 암시적 업캐스팅
	AddObj.Sum();
	//CalcPrn->Sum(); // 이것도 하고싶으면은 Sum()을 기반클래스에 Calc클래스의 가상함수로 선언해두면된다 ㅎㅎ
	CalcPtr->Prn(); // 지금 컴파일러는 분명히 Calc::Prn() 가르키고있다 하지만 가상함수이기때문에...
	AddObj.Prn();
	system("pause");
	return 0;
}
*/




//컴파일 단계에서는 변수의 자료형 이런거만 생성, 중요하지  그 변수들에 뭘 담지를 않는다. 
// 뭘 담는거는 실행 단계에서 하는거기때문 암튼
// 컴파일단계에서 함수의 호출이 있으니까   
// 함수는 기본적으로 정적바인딩을 함        암튼 컴파일단계에서 CalcPtr->Prn(); 하면 일단 CalcPtr이 무엇을 가리키는지는 모르고 중요하지도않는 단계임
// 그래서 컴파일 단계에서 Calc::Prn()으로 결정되고 이에 따라 실행단계에서도 Calc::Prn 이 호출된다 정적 바인딩 때문

// 그래서 이를 해결하기 위해서는 동적바인딩을 해야한다. 실행단계에서 이를 결정하자!!! 뭔가 되게 컴퓨터입장에서는 피곤할듯.
// 동적 바인딩을 하고자 하는 함수 앞에 virtual 예약어만 붙이면 된다. 이때 virtual 예약어를 붙인 함수를 '가상함수' 라고 한다.
// 암튼 기반클래스 Prn 에다 virtual 붙이면 파생클래스의 Prn에도 가상함수특징이 상속된다.

//결론 가상함수는 기반클래스의 오버라이딩될 함수 앞에 virtual만 붙이면 된다.
// virtual  허상의 함수    컴파일단계에서 해당 함수가 존재하지않는다고 하면 포인터변수의 클래스형으로 호출될 함수를 결정하지못하다가
// 싱행 시점에 객체 포인터 변수가 어떤 객체를 가리키고 있느냐에 따라 어떤 함수랑 바인딩할지 결정할 수 있도록 한다.


/*

//업 캐스팅과 오버라이딩
// 업 캐스팅한 CalcPtr 로 오버라이딩된 Prn함수 호출하면 포인터변수 선언햇을때 사용한 자료형의 Prn이 호출된다   Calc::Prn();
// 이게 일어나는 이유가 바인딩 문제때문인데 어쩌구저쩌구 이를 해결할게 가상함수 어쩌구
#include <iostream>
using namespace std;
class Calc {
protected:
	int a;
	int b;
	int c;
public:
	Calc(int new_A, int new_B);
	Calc();
	void Prn()const;

};
Calc::Calc(int new_A, int new_B) { a = new_A; b = new_B; c = 0; }
Calc::Calc() { a = 0; b = 0; c = 0; }
void Calc::Prn()const
{
	cout << a << "NULL" << b << c << endl;
}

class Add : public Calc {
public:
		Add(int new_A, int new_B);
		Add();
		void Sum();
		void Prn()const;
};
Add::Add(int new_A, int new_B) : Calc(new_A, new_B){}
Add::Add() : Calc(){}
void Add::Sum() { c = a + b; }
void Add::Prn()const
{
	cout << a << "+" << b << "=" << endl;
}



int main()
{
	
	Add AddObj(70, 12);
	AddObj.Sum();
	Calc *CalcPtr = &AddObj; // 암시적 형변환     업캐스팅

	// 이 상태에서 Prn을 호출해보자

	CalcPtr->Prn();


	// Calc::Prn(); 이 호출된다.
	// 그럼 포인터변수의 자료형이 아니라 객체 인스턴스의 자료형에 의해서 호출될 함수를 결정하려면 어떻게 해야할까...????
	// 바로 이런 요구에 의해서 만들어진게 가상함수란다.   가 상 함 수 virtual functions
	// 가상함수는 객체를 선언한 클래스형에 의해서 함수가 호출될수있게 해준다. 
	// 그러기 위해서 함수의 바인딩에 대해서 알아보자. 

	system("pause");
	return 0;

}

*/






/*
// 업 캐스팅과 다운 캐스팅
// 업 캐스팅은 기반클래스포인터객체변수에 =  & AddObj     파생클래스객체의 주소를 대입하는경우를 업캐스팅이라고한다.
// 보통 기반클래스가 위 파생클래스가 아래인데   대입하는 화살표가 위를 향하니까   업캐스팅이라 한다.
// 업캐스팅 예제 main() 맨 밑에 다운캐스팅 예제 있음
#include <iostream>
using namespace std;
class Calc {
protected:
	int a;
	int b;
	int c;
public:
	Calc(int new_A, int new_B);
	Calc();
	void CalcPrn()const;
};
Calc::Calc(int new_A, int new_B) { a = new_A; b = new_B; c = 0; }
Calc::Calc() { a = 0; b = 0; c = 0; }
void Calc::CalcPrn()const { cout << a << "Null" << b << "=" << c << endl; }
 
class Add : public Calc {
public :
	Add(int new_A, int new_B);
	Add();
	void Sum();
	void AddPrn()const;
};
Add::Add(int new_A, int new_B) : Calc(new_A, new_B){}
Add::Add() : Calc(){}
void Add::Sum()
{
	c = a + b;
}
void Add::AddPrn()const
{
	cout << a << "+" << b << "=" << c << endl;
}

class Mul : public Calc {
public:
	Mul(int new_A, int new_B);
	Mul();
	void Times();
	void MulPrn()const;
};
Mul::Mul(int new_A, int new_B) : Calc(new_A, new_B){}
Mul::Mul():Calc(){}
void Mul::Times() {
	c = a * b;
}
void Mul::MulPrn()const
{
	cout << a << "*" << b << "=" << c << endl;
}


int main()
{

	Mul MulObj(3, 12);
	MulObj.Times();

	Calc *CalcPtr;
	CalcPtr = &MulObj; // 업캐스팅이 암시적으로 일어남    CalcPtr = &(Calc)MulObj; 식으로   
	// 업캐스팅을하면
	// 1. 파생객체의 포인터가 기반객체의 포인터로 형변환되는것임
	// 2. 업 캐스팅을 하면 참조 가능한 영역이 기반클래스의 것으로 축소된다.
	// 3. 업 캐스팅은 컴파일러에 의해서 자동 형변환 된다.
	
	CalcPtr->CalcPrn();
	//CalcPtr->MulPrn();
	// CalcPtr 은 파생클래스의 멤버함수를 사용할수없는것같다.

	cout << "//***********************************" << endl;
	cout << " 여기부터 다운 캐스팅 예제" << endl;
	// 다운 캐스팅은 기반객체의 주소를 파생클래스객체포인터에 집어넣는건데 
	// 컴파일러가 자동으로 형변환 안해준다. 따라서 그냥 하면 컴파일 오류난다.

	Calc Obj(4, 3);
	Add * AddPtr;
	// AddPtr = &Obj; // 컴파일 에러난다.
	//  Calc 객체가 새로 생성되면 Calc 클래스에 의해서 생성된 영역은 Calc 영역뿐이지
	// Add 객체에 대한 영역을 존재하지 않는다.
	// 만약에 컴파일러가 에러를 안뿌리면은 포인터변수에 의해서 존재하지도 않는 영역에 접근하려고하는 어처구니 없는 상황이 일어남. 
	
	// 강제 형변환  무조건 강제로형변환 하면 안된다.  다음과 같은 경우에만 해준다.
	
	Calc *CalcPtr = new Add(5, 7); // 포인터변수 CalcPtr 이 새로운 Add 객체를 가리킨다. 여기서 업캐스팅된다.
								   // 여기서는 CalcPtr 은 Calc 클래스 멤버만 접근 가능하다.
								   // CalcPtr->Sum(); 에러이고 CalcPtr->AddPrn(); 또한 에러이다
                                   // Add * AddPtr = CalcPtr;   도 하면 안된다. 다음과 같이 해야한다.
	
	Add *AddPtr = (Add *)CalcPtr; // 다운캐스팅 명시적으로 형변환 해줘야한다. 다운캐스팅하려면 올라갔다 내려가야한댜..
	// 기반클래스객체의 주소를 파생클래스객체포인터변수에 대입하는 식으로 다운캐스팅을 할수도있는데 에러난다 컴파일에러는 피할수있어도 디버깅에러가난단다.
	// ex) AddPtr = (Add *)&CalcObj;
	



	system("pause");
	return 0;
}
*/





/*
// 곱셈에서는 * 덧셈에서는 + 출력하고싶다. 그러면 기반클래스의 Prn()멤버함수를  오버라이딩하면된다. 오버로딩이 아니다. 오버로딩은 매개변수를 다르게해주는거고
// 오버라이딩은 정의를 다시하는거다.
#include <iostream>
using namespace std;
class Calc {
protected:
	int a;
	int b;
	int c;
public:
	Calc(int new_A, int new_B);
	Calc();
	void Prn()const;
};
Calc::Calc(int new_A, int new_B)
{
	a = new_A; b = new_B; c = 0;
}
Calc::Calc()
{
	a = 0; b = 0; c = 0;
}
void Calc::Prn()const
{
	cout << a << "NULL" << b << " " << c << endl;
}

class Add : public Calc {
public:
	Add(int new_A, int new_B);
	Add();
	void Sum();
	void Prn() const; // Prn() 함수 오버라이딩
};
Add::Add(int new_A, int new_B) : Calc(new_A, new_B)
{}
Add::Add() : Calc()
{}
void Add::Sum() {
	c = a + b;
}
void Add::Prn()const {
	cout << a <<"+" << b << "=" << c << endl;
}

class Mul : public Calc {
public:
	Mul(int new_A, int new_B);
	Mul();
	void Times();
	void Prn() const; // overriding
};
Mul::Mul(int new_A, int new_B) : Calc(new_A, new_B){}
Mul::Mul() : Calc() {}
void Mul::Times()
{
	c = a * b;
}
void Mul::Prn() const
{
	cout << a << "*" << b << "=" << c << endl;
}


int main()
{
	Add x(4, 6);
	Mul y(3, 7);
	Calc z(3, 4);
	
	x.Sum();
	x.Prn();
	x.Calc::Prn(); // 오버라이딩해도 이렇게 기반클래스의 멤버함수를 가져와서 쓸수있다..

	y.Times();
	y.Prn();
	y.Calc::Prn();


	z.Prn(); // 근데 기반클래스객체에서는 파생클래스것을 가져올수가없는것같다 ㅎㅎ
	
	system("pause");
	return 0;
}
*/








/*
#include <iostream>
using namespace std;
class Calc {
protected:
	int a;
	int b;
	int c;
public:
	Calc(int new_A, int new_B);
	Calc();
	void Prn()const;
};
Calc::Calc(int new_A, int new_B)
{
	a = new_A;
	b = new_B;
	c = 0;
}
Calc::Calc()
{
	a = 0; b = 0; c = 0;
}
void Calc::Prn()const
{
	cout << a << " " << b << " " << c << endl;
}

// public 뺏다 꼇다 실험해보자
class Add : public Calc{
public:
	Add();
	Add(int new_A, int new_B);
	void Sum();
};
Add::Add() : Calc() // 명시적으로 디폴트 생성자 호출 왜냐하면 기반클래스에 매개변수있는 생성자가 있어서그럼
{
}
Add::Add(int new_A, int new_B) : Calc(new_A, new_B) // 위와 비슷하게 동
{
}
void Add::Sum()
{
	c = a + b;
}


void main(){
	Add x(4, 2), y;
	x.Sum();
	y.Sum();
	x.Prn();
	y.Prn();

	system("pause");
	return;
}
*/



/*
//상속성 
//private 기반클래스만 가능
//protected: 지정자     파생클래스와 기반클래스만 사용가능
//public 모두 가능    범위로 보면   private < protected < public 

//기반클래스 선언 정의 
//원래 만들 클래스의 공통된 부분을 기반클래스로 선언 정의 하면된다.

#include <iostream>  

using namespace std;
class Calc { //기반클래스  Calc
protected:
	int a;
	int b;
	int c;
	char flag; // 각 파생클래스의 생성자가 flag 멤버변수에 자기의 역할을 대입
public:
	Calc();
	~Calc();
	void Init(int new_A, int new_B);
	void Prn()const;
};
Calc::Calc() { // 상속관계에서는 생성자가 까다롭다 설명은 아래에 해놓겠다.  
	a = 0;
	b = 0;
	c = 0;
	flag = '\0';
	cout << "기반 생성자 호출"<<endl;
} // 생성자는 멤버함수이지만 상속 불가능,   파생객체가 생성될때 기반클래스의 생성자까지 자동호출됨
// 파생 객체 생성하면   기반생성자 -> 파생생성자    소멸때는    파생소멸자 -> 기반 소멸자 순으로 호출됨.
Calc::~Calc() {
	cout << "기반 소멸자 호출"<<endl;
	system("pause");
}
void Calc::Init(int new_A, int new_B)
{
	a = new_A;
	b = new_B;
}
void Calc::Prn()const
{
	cout << a << "\t" << flag << "\t" << b << " = " << c << endl;
}

// class Add : public 으로 하면 기반클래스 멤버들의 성격을 그대로 받을수있다. 
class Add : public Calc { //Clac의 파생(derlived)클래스 Add
public:
	Add();
	~Add();
	void Sum();
};
Add::Add()
{
	flag = '+';
	cout << "파생add 생성자 호출"<<endl;
}
Add::~Add()
{
	cout << "파생add 소멸자 호출"<<endl;
	system("pause");
}
void Add::Sum()
{
	c = a + b;
}



class Mul : public Calc { // Calc의 파생클래스 Mul
public:
	Mul();
	~Mul();
	void Times();
};
Mul::Mul()
{
	flag = '*';
	cout << "파생Mul 생성자 호출" << endl;
	
}
Mul::~Mul()
{
	cout << "파생Mul 소멸자 호출"<<endl;
	system("pause");
}

void Mul::Times()
{
	c = a * b;
}

//나중에 파생클래스 객체 생성자 정의할때  

 //Add::Add(int new_A, int new_B) : Calc(new_A, new_B)
 //{
 ////공백 아무것도 안해도된다. 왜냐하면 기반클래스생성자가 호출되는거에 값을 전달해주는거기때문에  
 //// 만약에 기반생성자랑 파생생성자랑 하는 일이 비슷하면 이렇게 넘겨주는것도 해도된다.
 //}





void main() 
{
	
	Add x; // 파생클래스로 객체를 만들때 기반클래스의 디폴트 생성자를 호출한다   ex testClass();   요러케   만약에 기반클래스에   testClass(int a, int b) 이렇게 있으면
	Mul y; // 컴파일러가 디폴트 생성자를 호출해야하는데 못찾아서 에러난다 그래서 매개변수 두개있는 생성자를 만들었다하면은 매개변수없는 디폴트생성자도 만들어줘야한다.

	x.Init(4, 2);
	x.Sum();
	x.Prn();

	y.Init(600, 3);
	y.Times();
	y.Prn();

	
	system("pause");
	return; // 여기에 도달했을때부터 소멸자들 호출되기 시작함 
}
*/

