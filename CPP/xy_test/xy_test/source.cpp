#include <iostream>
#include <windows.h>

using namespace std;


class Ball {
private:
	int x;
	int y;
	typedef struct{
		int vector_x;
		int vector_y;
	} vector_xy;
	vector_xy vecxy;
public:
	Ball(int x, int y);
	void setX(int _x) {
		x = _x;
	}
	int getX() {
		return x;
	}
	void setY(int _y) {
		y = _y;
	}
	int getY() {
		return y;
	}

	int getVectorX() {
		return vecxy.vector_x;
	}
	int getVectorY() {
		return vecxy.vector_y;
	}
	void setVector(int x, int y) {
		vecxy.vector_x = x;
		vecxy.vector_y = y;
	}
	
};
Ball::Ball(int x, int y) {
	Ball::x = x;
	Ball::y = y;
}



void printMap(Ball *balls) {
	system("cls");
	printf("X = %d  Y = %d \n", balls->getX(), balls->getY());
	int map[20][50];
	memset(map, 0, sizeof(map)); // 맵공간 초기화 

	map[balls->getY()][balls->getX()] = 8;

	for (int i = 0; i < 20; i++) {
		for (int j = 0; j < 50; j++) {
			if (map[i][j] != 8) {
				cout << " ";
			}
			else {
				cout << map[i][j];
			}
			
		}
		cout << endl;
		
	}
	
	

}

int getAbsolute(int num) {

	if (num < 0) {
		return -num;
	}
	else {
		return num;
	}
}





int main() {

	Ball* balls;
	balls = new Ball(10, 20);
	balls->setVector(1, 1);

	for (; ;) {
		printMap(balls);
		printf("X = %d  Y = %d", balls->getX(), balls->getY());
		Sleep(10);

		balls->setX(balls->getX() + balls->getVectorX());
		balls->setY(balls->getY() + balls->getVectorY());
		if (balls->getX() < 0 && balls->getY() < 0) { // 왼쪽 아래 구석 
			balls->setVector(getAbsolute(balls->getVectorX()), getAbsolute(balls->getVectorY()));
			balls->setX(balls->getX() + balls->getVectorX());
			balls->setY(balls->getY() + balls->getVectorY());
		}
		else if (balls->getX() < 0 && balls->getY() > 19) { // 왼쪽 위 구석 
			balls->setVector(getAbsolute(balls->getVectorX()), -getAbsolute(balls->getVectorY()));
			balls->setX(balls->getX() + balls->getVectorX());
			balls->setY(balls->getY() + balls->getVectorY());
		}
		else if (balls->getX() > 49 && balls->getY() < 0) { // 오른쪽 아래 구석 
			balls->setVector(-getAbsolute(balls->getVectorX()), getAbsolute(balls->getVectorY()));
			balls->setX(balls->getX() + balls->getVectorX());
			balls->setY(balls->getY() + balls->getVectorY());
		}
		else if (balls->getX() > 49 && balls->getY() > 19) { // 오른쪽 위 구석 
			balls->setVector(-getAbsolute(balls->getVectorX()), -getAbsolute(balls->getVectorY()));
			balls->setX(balls->getX() + balls->getVectorX());
			balls->setY(balls->getY() + balls->getVectorY());
		}
		else if (balls->getY() < 0) { // 아래
			balls->setVector(balls->getVectorX(), getAbsolute(balls->getVectorY()));
			
			balls->setY(balls->getY() + balls->getVectorY());
		}
		else if ( balls->getY() > 19) { // 위
			balls->setVector(balls->getVectorX(), -getAbsolute(balls->getVectorY()));
			
			balls->setY(balls->getY() + balls->getVectorY());
		}
		else if (balls->getX() > 49) { // 오른쪽
			balls->setVector(-getAbsolute(balls->getVectorX()), balls->getVectorY());
			balls->setX(balls->getX() + balls->getVectorX());
			
		}
		else if (balls->getX() < 0 ) { // 왼쪽
			balls->setVector(getAbsolute(balls->getVectorX()), balls->getVectorY());
			balls->setX(balls->getX() + balls->getVectorX());
			
		}
	}
	
	

	free(balls);
	return 0;
}


