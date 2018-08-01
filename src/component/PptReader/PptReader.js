import React, {Component} from 'react';

// CSS Imports
import './PptReader.css';

// Custom Component Imports
import NavigationBtn from './NavigationBtn';
import Slide from './Slide';
import apricot from '../../ws/apricot.jpg';

class PptReader extends Component {

    constructor(props) {
        super(props);
        let ws = new WebSocket(props.server);

        ws.onopen = function (event) {
            ws.send('{ "type":"connection", "content":"Browser ready."}');
            ws.send('{ "type":"slide", "numSlide":"' + 1 + '"}');
        };

        // Create function to use binding this
        function doWsCall(event, data) {
            var message = JSON.parse(event.data);
            this.processServerReturn(message);
        }

        ws.onmessage = doWsCall.bind(this);

        this.ws = ws;
        this.state = {
            numSlide: 1,
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
        let numSlideToUse = this.state.numSlide;
        switch (message.type) {
            case "connection":
                messageToUse = message.content;
                break;
            case "slide":
                numSlideToUse = message.numSlide;
                break;
            default:
                break;
        }

        // Update component status
        this.setState({
            message: messageToUse,
            image: imageToUse,
            numSlide: numSlideToUse,
        })
    }

    /**
     * Do WS call to get specific slide
     * @param numSlide Slide num
     */
    goToSlide(numSlide) {
        this.ws.send('{ "type": "slide", "numSlide":"' + numSlide + '"}');
    }

    /**
     * Do WS call to get next slide
     */
    goToNextSlide() {
        let numSlideInput = parseInt(this.state.numSlide) + 1;
        this.goToSlide(numSlideInput);
    }

    /**
     * Do WS call to get previous slide
     */
    goToPreviousSlide() {
        let numSlideInput = parseInt(this.state.numSlide) - 1;
        this.goToSlide(numSlideInput);
    }

    render() {
        return (
            <div class="PptReader-flex-container">
                <header class="PptReader-header">
                    <div id="message">{this.state.message}</div>
                </header>
                <article class="PptReader-main">
                    <Slide image={apricot}/>
                </article>
                <aside class="PptReader-aside PptReader-aside1">
                    <NavigationBtn onClick={() => this.goToPreviousSlide()}/>
                </aside>
                <aside class="PptReader-aside PptReader-aside2">
                    <NavigationBtn isNext="true" onClick={() => this.goToNextSlide()}/>
                </aside>
                <footer class="PptReader-footer">
                    <div>Slide numéro : {this.state.numSlide}</div>
                </footer>
            </div>
        );
    }
}

export default PptReader;
