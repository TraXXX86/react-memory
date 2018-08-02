import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AYM from './component/AYM/AYM';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <AYM server="ws://localhost:8100" meeting_id="1_ppt"/>
    </div>
    , document.getElementById('root'));

registerServiceWorker();
