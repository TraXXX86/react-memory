import React, {Component} from 'react';

// CSS Imports
import './PptReader.css';

// Custom Component Imports
import NavigationBtn from './NavigationBtn';
import Slide from './Slide';

class PptReader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meeting_id: props.meeting_id,
            ws_client: props.wsclient,
        };
    }

    /**
     * Do WS call to get specific slide
     * @param slide_id Slide id
     */
    goToSlide(slide_id) {
        this.state.ws_client.send('{ "event": "REQUEST_SLIDE", "meeting": {"id": "' + this.state.meeting_id + '"}, "slide":"' + slide_id + '"}');
    }

    /**
     * Do WS call to get next slide
     */
    goToNextSlide(slide_id) {
        let numSlideInput = parseInt(slide_id) + 1;
        this.goToSlide(numSlideInput);
    }

    /**
     * Do WS call to get previous slide
     */
    goToPreviousSlide(slide_id) {
        let numSlideInput = parseInt(slide_id) - 1;
        this.goToSlide(numSlideInput);
    }

    render() {
        return (
            <div className="PptReader-flex-container">
                <header className="PptReader-header">
                    <div id="message">{this.props.message}</div>
                </header>
                <article className="PptReader-main">
                    <Slide image={this.props.image}/>
                </article>
                <aside className="PptReader-aside PptReader-aside1">
                    <NavigationBtn onClick={() => this.goToPreviousSlide(this.props.slide_id)}/>
                </aside>
                <aside className="PptReader-aside PptReader-aside2">
                    <NavigationBtn isNext="true" onClick={() => this.goToNextSlide(this.props.slide_id)}/>
                </aside>
                <footer className="PptReader-footer">
                    <div>Slide numéro : {this.props.slide_id}</div>
                </footer>
            </div>
        );
    }
}

export default PptReader;
