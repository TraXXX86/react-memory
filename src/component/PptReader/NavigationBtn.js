import React, {Component} from 'react';

class NavigationBtn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNext: props.isNext,
            onClick: props.onClick,
        };
    }

    getNavigationText(isNext) {
        if (isNext) {
            return "Next";
        } else {
            return "Previous";
        }
    }


    render() {
        return (
            <button
                className="NavigationBtn"
                onClick={() => this.state.onClick()}
            >
                {this.getNavigationText(this.state.isNext)}
            </button>
        );
    }
}

export default NavigationBtn;
