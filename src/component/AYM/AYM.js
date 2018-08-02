import React, {Component} from 'react';
import './AYM.css';
import PptReader from '../PptReader/PptReader';

class AYM extends Component {

    constructor(props) {
        super(props);
        let ws_client = new WebSocket(props.server);

        // Create function to use binding this
        function doWsInit(event) {
            ws_client.send('{ "meeting": {"id": "' + this.props.meeting_id + '"}, "event": "REQUEST_JOIN", "user": {"id": "54F12","secret": "BC12"}}');
        }
        ws_client.onopen = doWsInit.bind(this);

        // Create function to use binding this
        function doWsCall(event) {
            var message = JSON.parse(event.data);
            this.processServerReturn(message);
        }
        ws_client.onmessage = doWsCall.bind(this);

        this.ws_client = ws_client;
        this.state = {
            slide_id: 1,
        };
    }

    /**
     * Process responses messages
     * @param message
     */
    processServerReturn(message) {
        let meetingToUse = this.state.meeting;
        let userIdToUse = this.state.user_id;
        let slideToUse = this.state.slide_id;
        let imageToUse = this.state.image;

        console.log('AYM : ' + message.event);

        switch (message.event) {
            case "JOIN":
                meetingToUse = message.meeting;
                if (message.user != null) {
                    userIdToUse = message.user.id;
                    this.ws_client.send('{ "event": "REQUEST_SLIDE", "meeting": {"id": "' + message.meeting.id + '"}, "slide":"' + 1 + '"}');
                }
                break;
            case "INFO_MEETING":

                break;
            case "SLIDE":
                slideToUse = message.current;
                if(message.data != null){
                    imageToUse = window.atob(message.data);
                }
                break;
            default:
                break;
        }

        // Update component status
        this.setState({
            meeting: meetingToUse,
            user_id: userIdToUse,
            slide_id: slideToUse,
            image: imageToUse,
        })
    }

    render() {
        if (this.state.user_id != null) {
            return (
                <div className="AYM">
                    <PptReader wsclient={this.ws_client} meeting_id={this.state.meeting.id} slide_id={this.state.slide_id} image={this.state.image} />
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
