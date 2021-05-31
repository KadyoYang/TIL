#include "Test.h"
#include <iostream>

void Test::printA(){
    std::cout << this->a << std::endl;
}

void Test::printMock(Mock *mock){
    for(int i = 0 ; i < 5; i ++){
        std::cout << mock->data[i] << " : " ;
    }
    std::cout << std::endl;
}