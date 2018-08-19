import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import './index.css';
//import registerServiceWorker from './registerServiceWorker';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSignInAlt,
    faSignOutAlt,
    faPlusCircle,
    faFilePowerpoint,
    faFont,
    faUser,
    faGlobe,
    faArrowCircleLeft,
    faArrowCircleRight,
    faHome,
    faCheck,
    faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons'
import HomeScreen from './component/AYM/HomeScreen';
import LoginScreen from './component/AYM/LoginScreen';
import CreateMeetingScreen from './component/AYM/CreateMeetingScreen';
import OpenMeetingScreen from './component/AYM/OpenMeetingScreen';
import MeetingScreen from './component/AYM/MeetingScreen';

// Add all font awesome icons :
library.add(faSignInAlt, faSignOutAlt, faPlusCircle, faFilePowerpoint, faFont, faUser, faGlobe, faArrowCircleLeft, faArrowCircleRight, faHome, faCheck, faChalkboardTeacher);

const Root = () => (
    <Router>
        <div>
            <Route exact path="/" component={HomeScreen}/>
            <Route path="/login" component={LoginScreen}/>
            <Route path="/create_meeting" component={CreateMeetingScreen}/>
            <Route path="/open_meeting" component={OpenMeetingScreen}/>
            <Route path="/meeting" component={MeetingScreen}/>
        </div>
    </Router>
)

ReactDOM.render(
    <div>
        <Root />
    </div>
    , document.getElementById('root'));

//registerServiceWorker();
