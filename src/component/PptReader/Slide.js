import React from 'react';
import './Slide.css';

class Slide extends React.Component {
    render() {
        return (
            <div className="Slide-flex-container">
                <img className="Slide-flex-item" ref="image" alt="Current Slide" src={ this.props.image }/>
            </div>
        )
    }
}

export default Slide;