#ifndef TEST_H
#define TEST_H

#include "Mock.h"

class Test { 
    public:
    int a;
    void printA();
    void printMock(Mock *mock);
};
#endif
