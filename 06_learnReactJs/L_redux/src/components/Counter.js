import React, {useState} from 'react';


// 프레젠테이셔널 컴포넌트, 
// 프레젠테이셔널 컴포넌트란 리덕스 스토어에 직접 접근하지않고
// 필요한 값 또는 함수를 props로만 받아와서 사용하는 컴포넌트이다.

function Counter({number, diff, onIncrease, onDecrease, onSetDiff}){
    const onChange = (event) => {
        onSetDiff(parseInt(event.target.value, 10));
    };

    return (
        <div>
            <h1>{number}</h1>
            <div>
                <input type="number" value={diff} min="1" onChange={onChange}/>
                <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button>
            </div>
        </div>
    );
}
//프레젠테이셔널 컴포넌트에선 주로 이렇게 UI를 선언하는 것에 집중하며, 
// 필요한 값들이나 함수는 props로 받아와서 사용하는 형태로 구현한다.
export default Counter;