/* 액션 타입 설정 */
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

/* 액션객체 생성함수 선언*/
let nextId = 1; // todo 데이터에서 사용할 고유 id
export const addTodo = (text) => ({
    type: ADD_TODO,
    todo: {
        id: nextId++,
        text
    }
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
});

/* 초기상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요가 없다
// 배열이어도되고, 원시타입(숫자, 문자열, 불리언 이여도 상관없음)
const initialState = [
    /*
    data example
    {id: 1, text="temp", done=false}
    */
];

export default function todos(state = initialState, action){
    switch(action.type){
        case ADD_TODO: 
            return state.concat(action.todo);
        case TOGGLE_TODO:
            return state.map(
                todo=>
                    todo.id === action.id /// id가 일치하면
                    ?{...todo, done: !todo.done} // done값을 반전시키고
                    : todo // 아미녕느 그대로 둠
                
            );
        default:
            return state;
    }
}