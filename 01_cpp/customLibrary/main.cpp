#include <iostream>
#include "Test.h"
#include "Mock.h"


using namespace std;

int main() {

	Test test;
	test.a = 1;
	test.printA();

	Mock mock;
	test.printMock(&mock);

	
	return 0;
}