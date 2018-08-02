import React, {Component} from 'react';
import './AYM.css';
import PptReader from '../PptReader/PptReader';

class AYM extends Component {

    constructor(props) {
        super(props);
        let ws = new WebSocket(props.server);

        // Create function to use binding this
        function doWsInit(event) {
            ws.send('{ "meeting": "' + this.props.meeting_id + '", "event": "REQUEST_JOIN", "user": {"id": "54F12","secret": "BC12"}}');
        }
        ws.onopen = doWsInit.bind(this);

        // Create function to use binding this
        function doWsCall(event) {
            var message = JSON.parse(event.data);
            this.processServerReturn(message);
        }
        ws.onmessage = doWsCall.bind(this);

        this.ws = ws;
        this.state = {
            server: props.server,
        };
    }

    /**
     * Process responses messages
     * @param message
     */
    processServerReturn(message) {
        let meetingIdToUse = this.state.meeting_id;
        let userIdToUse = this.state.user_id;

        console.log('AYM : ' + message.event);

        switch (message.event) {
            case "JOIN":
                meetingIdToUse = message.meeting;
                if (message.user != null) {
                    userIdToUse = message.user.id;
                }
                break;
            default:
                break;
        }

        // Update component status
        this.setState({
            meeting_id: meetingIdToUse,
            user_id: userIdToUse,
            message: message,
        })
    }

    render() {
        if (this.state.user_id != null) {
            return (
                <div className="AYM">
                    <div>
                        <PptReader wsclient={this.ws} meeting_id={this.state.meeting_id} message={this.state.message} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="AYM">
                    Connectes toi !
                </div>
            );
        }

    }
}

export default AYM;
