import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App/App';
import Screen from './component/Screen/Screen';
import Game from './component/TicTacToe/Game';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <App />
        <Screen mycustomtext="test"/>
        <Game />
    </div>
    , document.getElementById('root'));

registerServiceWorker();
