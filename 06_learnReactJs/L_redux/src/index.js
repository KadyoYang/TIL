import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';
import rootReducer from './modules';
import {Provider} from 'react-redux';

const store = createStore(rootReducer); // 스토어 생성
//console.log(store.getState()); // 스토어 상태 확인
// react에서 쓸때는 react-redux 이용하는게 편하다.
// 여까지 6장 4.


// <Provider store={store} 이렇게 하고 그안에 <App /> 을 하면
// 우리가 렌더링하는 그 어떤 컴포넌트던지 전부 리덕스 스토어에 접근할수있게된다.
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
