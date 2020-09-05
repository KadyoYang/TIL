// 스택구조.
// 후입 선출 first in first out 
// 항상 top은 항상 삽입된 자료를 마지막 자료로 가르킨다.
// pop() 으로 꺼내고 push()로 넣고.
// pop 삭제
// push 삽입

// c++의 캡슐화. 클래스가 내부적으로 어떻게 돌아가는지는 몰라도.
// 멤버함수로 잘 쓸수있게 알아서 .

/*

#include <iostream>
using namespace std;

#define MAX 10

class Stack {
private:
	double item[MAX];
	int top;
public:
	Stack(); // 최초에 push 될깨 top+1이 되므로    생성자에서 top = -1로 초기화해놓자.
	bool Push(double data); // 작업의 성공과 실패를 알수있도록 반환형을 bool로 하자
	bool Pop(double &data); // 매개변수로 꺼내와야하므로
	void ShowStack() {
		cout << top << endl;
		for (int i = 0; i < MAX; i++) {
			cout << i << ": " << item[i] << endl;
		}
	}
};

Stack::Stack(){
	top = -1;
}

bool Stack::Push(double data) {
	if (top >= MAX - 1) {
		cout << "Error: 스택이 가득 찼다" << endl;;
		return false;
	}
	else {
		++top;
		item[top] = data;
		return true;
	}
}

bool Stack::Pop(double &data) {
	if (top < 0) {
		cout << "Error: 스택이 비었다."<<endl;
		return false;
	}
	else {
		data = item[top];
		item[top] = NULL;
		--top;
		return true;
	}
}

void main()
{
	double data;
	Stack stackObj;

	stackObj.ShowStack();
	
	stackObj.Push(10);
	stackObj.Push(12);
	stackObj.Push(231);

	stackObj.ShowStack();

	stackObj.Pop(data);
	cout << data << endl;
	stackObj.ShowStack();
}

*/