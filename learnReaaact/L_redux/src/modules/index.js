import {combineReducers} from 'redux';
import counter from './counter';
import todos from './todos';



const rootReducer = combineReducers({
    counter,
    todos
});

export default rootReducer;

// 루트 리듀서 만들기
/*
현재 두가지 리덕스모듀ㅜㄹ을 만들었고 그래서 리듀서도 두개다
이거를 하나로 합쳐야한다.
이 합치는놈을 루트리듀서라고하고
리듀서를 합치는 작업은 리덕스에 내장되있는 cobineRecucers 라는 함수를 사용한다.


*/