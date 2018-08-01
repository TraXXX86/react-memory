import React, { Component } from 'react';

class Screen extends Component {
    constructor (props) {
        super(props)
        this.state = { loginState: 'logged-out' }
        this.mycustomtext = props.mycustomtext
    }

    mymethod(text){
        var result = '';
        for(var i = 1; i<5; i++){
            result = result + text;
        }
        return result;
    }

    render () {
        return (
            <div>
                {this.mymethod(<div>Coucou {this.mycustomtext} !</div>)}
            </div>
        )
    }


}

export default Screen;