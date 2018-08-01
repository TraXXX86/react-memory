import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App/App';
import Screen from './component/Screen/Screen';
import Game from './component/TicTacToe/Game';
import PptReader from './component/PptReader/PptReader';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <PptReader server="ws://localhost:8100" idPpt="1_ppt"/>
    </div>
    , document.getElementById('root'));

registerServiceWorker();
