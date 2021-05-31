#include "Mock.h"

Mock::Mock(){
    for(int i =0 ; i < 5; i++){
        this->data[i] = i;
    }
}