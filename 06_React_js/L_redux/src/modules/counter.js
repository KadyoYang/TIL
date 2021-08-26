/* 액션 타입 만들기 */
// Ducks 패턴(다몰아서 뭉쳐뭉쳐) 을 따를때는 액션의 이름에 접두사를 넣어줘야한다.
// 이렇게 하면 다른 모듈과 핵션 이름이 중복되는 것을 방지할 수 있다.

const SET_DIFF  = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';


/* 액션객체 생성함수 만들기 */
export const setDiff = (diff) => ({type: SET_DIFF, diff});
export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});

/* 초기상태 선언*/
const initialState = {
    number: 0,
    diff: 1
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내줘라
export default function counter(state= initialState, action){
    switch(action.type){
        case SET_DIFF:
            return{...state, diff: action.diff};
        case INCREASE:
            return{...state, number: state.number + state.diff};
        case DECREASE:
            return{...state, number: state.number - state.diff};
        default:
            return state;
    }
}