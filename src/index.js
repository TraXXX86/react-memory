import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Authentification from './component/Authentification/Authentification';

import { createStore } from 'redux'

import registerServiceWorker from './registerServiceWorker';

function reduceFunction(state = 0, action) {
    return  action.type === 'INCREMENT' ? state + 1
        : action.type === 'DECREMENT' ? state - 1
        : state;
}

const store = createStore(reduceFunction);

store.subscribe(() =>
    console.log(store.getState())
)

/*
 function counter(state = 0, action) {
 return  action.type === 'INCREMENT' ? state + 1
 : action.type === 'DECREMENT' ? state - 1
 : state;
 }

let store = createStore(counter);
 store.subscribe(() =>
 console.log(store.getState())
 )
 store.dispatch({ type: 'INCREMENT' }) // 1*/

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })

// "ws://192.168.1.65:8082"

ReactDOM.render(
    <div>
        <Authentification store={store}/>
    </div>
    , document.getElementById('root'));

registerServiceWorker();
