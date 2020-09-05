
// 큐는 선입선출
// 앞(front)과    뒤(rear)를      put get
// 선형 큐와 원형큐  circular queue 
// 선형큐는 하나 없애면 뒤엣놈들 다 앞으로와야함. 컴퓨터가 귀찮은 작업 해서 느려짐
// 원형큐는 그냥 포인터가 가리키는놈이 앞이라고생각하면 됨
// 개가 지 꼬리 물으려고 빙빙 도는거 생각하면 됨 ㅎ
// 원형 큐 구현
/*
#include <iostream>
using namespace std;
#define MAX 10


class Queue {
private:
	double queueDat[MAX];
	int front;
	int rear; // 가리키고있는 기준값들.
	bool is_this_full; // 이거 설정할 필요없다. 방법이 있다 . 


public:
	Queue();
	bool Put(double data);
	bool Get(double &data);
	void ShowQueue();
};


Queue::Queue() {
	for (int i = 0; i < MAX; i++) {
		queueDat[i] = NULL;
	}
	front = 0; // 처음에 front가 10 rear 가 0
	rear = 0; // 아 ㅍ시발 핑싄아~~~ 생성자에다가 지역변수를 만들면 어쩌니 ㅋㅋㅋㅋㅋㅋㅋㅋㅋ
	is_this_full = false;
}


bool Queue::Put(double data) {
	if (is_this_full == true) {
		cout << "ERROR: 원형큐가 꽉 차서 넣을 공간이 없다."<<endl;
		return false;
	}else {
		queueDat[rear] = data;
		rear = (++rear) % MAX; // 와 머리 좋다.
			if (front == rear) {
				is_this_full = true;
			}
			this->ShowQueue();
			return true;
	}	
}


bool Queue::Get(double &data) {
	if (is_this_full == false && front == rear) {
		cout << "ERROR: 원형큐가 비어서 꺼낼것이 없다" << endl;
		return false;
	}else {
		data = queueDat[front];
		queueDat[front] = NULL;
		front = (++front) % MAX;
		is_this_full = false;
		this->ShowQueue();
		return true;
	}
}


void Queue::ShowQueue(){
	cout << "ShowQueue 호출";
	for (int i = 0; i < MAX; i++) {
	cout << i << "::" << queueDat[i] << "\t";
	}
	cout << endl;
	return;
}


void main() {
	Queue Qobj;
	double data = 20;
	bool temp = true;
	cout << "선언 끝" << endl;

	Qobj.ShowQueue();

	Qobj.Put(data);
	Qobj.Put(23);
	Qobj.Put(123);
	Qobj.Put(64);
	Qobj.Put(534);

	Qobj.Put(90);
	Qobj.Put(12);
	Qobj.Put(145);
	Qobj.Put(132);
	Qobj.Put(51);

	Qobj.Put(12);
	Qobj.Put(23);

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Put(17);
	Qobj.Put(27);
	Qobj.Put(29);
	Qobj.Put(23);
	Qobj.Put(294);

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Get(data);
	cout << data << endl;

	Qobj.Put(29);
	Qobj.Put(23);
	Qobj.Put(294);
}

*/








/*
// 교과서 방법 교과서 방법은 is this full ?? 이 필요하지않다.

// ㅋㅋㅋㅋㅋㅋㅋㅋㅋ 교과서 ㅋㅋㅋㅋㅋㅋㅋㅋㅋ rear가 9일때 9번째거 안넣어짐 Put안댐
//ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 조건 +1을 없애자니 Get이; 안됨 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
// 내 방법대로 해야함.

#include <iostream>
using namespace std;
#define MAX 10

class Queue {
private:
	char queue[MAX];
	int front;
	int rear;

public:
	Queue();
	bool Put(char data);
	bool Get(char &data);
	void PrnQueue() {
		for (int i = 0; i < MAX; i++) {
			cout << i << "::" << queue[i]<<"\t";
		}
		cout << endl;
	}
};


Queue::Queue() {
	front = 0;
	rear = 0;
	for (int i = 0; i < MAX; i++) {
		queue[i] = NULL;
	}
}


bool Queue::Put(char data) {
	if (front == ((rear + 1) % MAX)) {
		cout << "ERROR: 원형큐가 꽉참" << endl;
		return false;
	}else {
		queue[rear] = data;
		rear = ++rear % MAX;
		PrnQueue();
		return true;
	}
}


bool Queue::Get(char &data) {
	if (rear == ((front + 1) % MAX)) {
		cout <<"ERROR: 원형큐가 비었음" <<endl;
			return false;
	}else {
		data = queue[front];
		queue[front] = NULL;
		front = ++front % MAX;
		PrnQueue();
		cout << data << endl;
		return true;
	}
}


void main()
{
	Queue qObj;
	char Data;
	
	qObj.Put('A');
	qObj.Put('B');
	qObj.Put('C');
	qObj.Put('D');

	qObj.Get(Data);
	qObj.Get(Data);

	qObj.Put('E');
	qObj.Put('F');
	qObj.Put('G');
	qObj.Put('H');
	qObj.Put('I');
	qObj.Put('J');
	qObj.Put('K');
	qObj.Put('L');

	qObj.Put('M'); // 아마 에러
	qObj.Put('M');


	qObj.Get(Data);
	qObj.Get(Data);
	qObj.Get(Data);
	qObj.Get(Data);
	qObj.Get(Data);
	qObj.Get(Data);
	qObj.Get(Data);
	qObj.Get(Data);
	qObj.Get(Data);
	qObj.Get(Data);

	qObj.Get(Data);
	qObj.Get(Data); // 아마 에러 

	qObj.Put('A'); // 성공


}


*/