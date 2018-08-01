import React, {Component} from 'react';

// CSS Imports
import './PptReader.css';

// Custom Component Imports
import NavigationBtn from './NavigationBtn';
import Slide from './Slide';

class PptReader extends Component {

    constructor(props) {
        super(props);
        let ws = new WebSocket(props.server);

        // Create function to use binding this
        function doWsInit(event) {
            ws.send('{ "type":"connection", "content":"Browser ready."}');
            ws.send('{ "type":"slide", "idPpt":"' + this.props.idPpt + '", "numSlide":"' + 1 + '"}');
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
            numSlide: 1,
            idPpt: props.idPpt,
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
        let idPptToUse = this.state.idPpt;
        let numSlideToUse = this.state.numSlide;
        switch (message.type) {
            case "connection":
                messageToUse = message.content;
                break;
            case "slide":
                numSlideToUse = message.numSlide;
                if(message.data != null){
                    imageToUse = window.atob(message.data);
                }
                break;
            default:
                break;
        }

        // Update component status
        this.setState({
            idPpt: idPptToUse,
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
        this.ws.send('{ "type": "slide", "idPpt":"1_ppt", "numSlide":"' + numSlide + '"}');
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
                    <div>Slide numéro : {this.state.numSlide}</div>
                </footer>
            </div>
        );
    }
}

export default PptReader;
