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
        let nextSlideToUse = this.state.next_slide;
        let previousSlideToUse = this.state.previous_slide;

        switch (message.event) {
            case "JOIN":
                // TODO : Update users list
                meetingToUse = message.meeting;
                break;
            case "INFO_MEETING":
                meetingToUse = message.meeting;
                // Get Image url
                this.imgServerUri = message.meeting.server.slide_uri;
                imageToUse = this.generateImgUrl(this.imgServerUri, message.meeting.id, message.meeting.current_slide.id);
                // Get previous and next slide id
                let slides_nav = this.processSlidesList(message.meeting.slides, message.meeting.current_slide.id);
                nextSlideToUse = slides_nav.next;
                previousSlideToUse = slides_nav.previous;
                break;
            case "SLIDE":
                slideToUse = message.meeting.current_slide;
                imageToUse = this.generateImgUrl(this.imgServerUri, message.meeting.id, message.meeting.current_slide.id);
                // Get previous and next slide id
                slides_nav = this.processSlidesList(this.state.meeting.slides, message.meeting.current_slide.id);
                nextSlideToUse = slides_nav.next;
                previousSlideToUse = slides_nav.previous;
                break;
            default:
                break;
        }

        // Update component status
        this.setState({
            meeting: meetingToUse,
            user_id: userIdToUse,
            slide: slideToUse,
            image: imageToUse,
            next_slide: nextSlideToUse,
            previous_slide: previousSlideToUse,
        })
    }

    generateImgUrl(serverPath, meeting_id, slide_id) {
        // https://xxxxxxxx/{meeting}/slides/{slide}
        let result = serverPath;
        result = result.replace('{meeting}', meeting_id);
        result = result.replace('{slide}', slide_id);
        return result;
    }

    processSlidesList(slides, current_slide_id) {
        let result;
        let previous = null;
        let next = null;
        for (var i = 0; i < slides.length; i++) {
            if (slides[i].id == current_slide_id) {
                if (i > 0) {
                    previous = slides[i - 1].id;
                }
                if (i < slides.length - 1) {
                    next = slides[i + 1].id;
                }
                result = {
                    'previous': previous,
                    'next': next,
                };
                break;
            }
        }
        return result;
    }

    render() {
        if (this.state.meeting != null && this.state.slide_id != null) {
            return (
                <div className="AYM">
                    <PptReader wsclient={this.ws_client}
                               meeting_id={this.state.meeting.id}
                               title={this.state.meeting.title}
                               slide_title={this.state.slide.title}
                               image={this.state.image}
                               next_slide={this.state.next_slide}
                               previous_slide={this.state.previous_slide}/>
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
