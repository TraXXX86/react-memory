import React, { Component } from 'react';
import './Slide.css';

/*function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}*/

class Slide extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            image: props.image
        }
    }

    /*componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            //ctx.font = "40px Courier";
            //ctx.fillText(this.props.text, 210, 75);
        }
    }*/
    render() {
        return(
            <div class="Slide-flex-container">
                    <img class="Slide-flex-item" ref="image" src={this.state.image} />
            </div>
        )
    }
}

export default Slide;