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
        this.state.ws_client.send('{ "event": "REQUEST_SLIDE", "meeting": {"id": "' + this.state.meeting_id + '", "current_slide": {"id": "' + slide_id + '"}}}');
    }

    render() {
        return (
            <div className="PptReader-flex-container">
                <header className="PptReader-header">
                    <div id="message">{this.props.title}</div>
                </header>
                <article className="PptReader-main">
                    <Slide image={this.props.image}/>
                </article>
                <aside className="PptReader-aside PptReader-aside1">
                    <NavigationBtn onClick={() => this.goToSlide(this.props.previous_slide)}/>
                </aside>
                <aside className="PptReader-aside PptReader-aside2">
                    <NavigationBtn isNext="true" onClick={() => this.goToSlide(this.props.next_slide)}/>
                </aside>
                <footer className="PptReader-footer">
                    <div>{this.props.slide_title}</div>
                </footer>
            </div>
        );
    }
}

export default PptReader;
