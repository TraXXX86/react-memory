import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSignInAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import HomeScreen from './component/AYM/HomeScreen';
import CreateMeetingScreen from './component/AYM/CreateMeetingScreen';
import Authentification from './component/Authentification/Authentification';


// Add all font awesome icons :
library.add(faSignInAlt, faPlusCircle);

const Home = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create_meeting">Create meeting</Link></li>
            <li><Link to="/authentification">Connection</Link></li>
        </ul>
        <HomeScreen />
    </div>
)

const CreateMeeting = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create_meeting">Create meeting</Link></li>
            <li><Link to="/authentification">Connection</Link></li>
        </ul>
        <CreateMeetingScreen />
    </div>
)

const AuthentificationScreen = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create_meeting">Create meeting</Link></li>
            <li><Link to="/authentification">Connection</Link></li>
        </ul>
        <Authentification />
    </div>
)

const BasicExample = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/create_meeting" component={CreateMeeting}/>
            <Route path="/authentification" component={AuthentificationScreen}/>
        </div>
    </Router>
)

ReactDOM.render(
    <div>
        <BasicExample />
    </div>
    , document.getElementById('root'));

registerServiceWorker();
