import React, {Component} from 'react';

// CSS Imports
import './PptReader.css';

// Custom Component Imports
import NavigationBtn from './NavigationBtn';
import Slide from './Slide';

class PptReader extends Component {

    constructor(props) {
        super(props);
        this.ws = props.wsclient;

        // Create function to use binding this
        function doWsCall(event) {
            var message = JSON.parse(event.data);
            this.processServerReturn(message);
        }
        this.ws.onmessage = doWsCall.bind(this);

        this.ws.send('{ "event":"REQUEST_SLIDE", "meeting":"' + this.props.meeting_id + '", "slide":"' + 1 + '"}');

        this.state = {
            slide_id: 1,
            meeting_id: props.meeting_id,
            message: null,
            image: null,
        };
    }

    /**
     * Process responses messages
     * @param message
     */
    processServerReturn(message) {
        let messageToUse = this.state.message;
        let imageToUse = null;
        let meetingIdToUse = this.state.meeting_id;
        let slideToUse = this.state.slide_id;
        console.log('PptReader : ' + message.event)
        switch (message.event) {
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
            meeting_id: meetingIdToUse,
            message: messageToUse,
            image: imageToUse,
            slide_id: slideToUse,
        })
    }

    /**
     * Do WS call to get specific slide
     * @param slide_id Slide id
     */
    goToSlide(slide_id) {
        this.ws.send('{ "event": "REQUEST_SLIDE", "meeting":"' + this.state.meeting_id + '", "slide":"' + slide_id + '"}');
    }

    /**
     * Do WS call to get next slide
     */
    goToNextSlide() {
        let numSlideInput = parseInt(this.state.slide_id) + 1;
        this.goToSlide(numSlideInput);
    }

    /**
     * Do WS call to get previous slide
     */
    goToPreviousSlide() {
        let numSlideInput = parseInt(this.state.slide_id) - 1;
        this.goToSlide(numSlideInput);
    }

    render() {
        return (
            <div className="PptReader-flex-container">
                <header className="PptReader-header">
                    <div id="message">{this.state.message}</div>
                </header>
                <article className="PptReader-main">
                    <Slide image={this.state.image}/>
                </article>
                <aside className="PptReader-aside PptReader-aside1">
                    <NavigationBtn onClick={() => this.goToPreviousSlide()}/>
                </aside>
                <aside className="PptReader-aside PptReader-aside2">
                    <NavigationBtn isNext="true" onClick={() => this.goToNextSlide()}/>
                </aside>
                <footer className="PptReader-footer">
                    <div>Slide numéro : {this.state.slide_id}</div>
                </footer>
            </div>
        );
    }
}

export default PptReader;
