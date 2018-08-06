import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AYM from '../AYM/AYM';

class Authentification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_profil: 'learner',
            meeting_id: '1AF',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Update component state on each change
     * @param event
     */
    handleChange(event) {
        // Update a partial state
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    /**
     * Open AYM application when user is connected
     * @param event
     */
    handleSubmit(event) {
        // TODO : Get the correct id from DB ?
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        let user_id = getRandomInt(19);

        // Open AYM application for selected User and selected meeting
        const aym = (
            <div>
                <AYM server={this.state.server_name} meeting_id={this.state.meeting_id} user_id={this.state.user_name} user_name={this.state.user_name} user_profil={this.state.user_profil}/>
            </div>
        );
        ReactDOM.render(aym, document.getElementById('root'));
    }

    render() {
        return (
            <form className="Authentification" onSubmit={this.handleSubmit}>
                <label>
                    Server:
                    <input id="server_name" type="text" value={this.state.server_name} onChange={this.handleChange}/>
                </label>
                <br />
                <label>
                    Name:
                    <input id="user_name" type="text" value={this.state.user_name} onChange={this.handleChange}/>
                </label>
                <br />
                <label>
                    Select your profile:
                    <select id="user_profil" value={this.state.user_profil} onChange={this.handleChange}>
                        <option value="learner">Learner</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </label>
                <br />
                <label>
                    Select your meeting room:
                    <select id="meeting_id" value={this.state.meeting_id} onChange={this.handleChange}>
                        <option value="1AF">Default Room</option>
                    </select>
                </label>
                <br />
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default Authentification;
