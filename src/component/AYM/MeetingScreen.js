import React from 'react';
import {withRouter} from 'react-router-dom'

import AYM from './AYM';

class MeetingScreen extends React.Component {
    render() {
        let server_url = null;
        let meeting_id = null;
        let user_name = 'No Name';
        let user_profil = null;

        if(this.props.location.state != null){
            server_url = this.props.location.state.server_url;
            meeting_id = this.props.location.state.meeting_id;
            user_name = this.props.location.state.user_name;
            user_profil = this.props.location.state.user_profil;
        }

        let get_params = this.props.location.search;
        if(get_params != null){
            let search_params = new URLSearchParams(get_params);
            if(search_params.get('mid') != null){
                meeting_id = search_params.get('mid');
            }
            if(search_params.get('type') != null){
                user_profil = search_params.get('type');
            }

        }
        if(server_url == null || server_url === ''){
            // TODO : set server adress here
            server_url = 'wss://aym.arbey.fr/ws';
        }

        return (
            <AYM server={server_url}
                 meeting_id={meeting_id}
                 user_id={user_name}
                 user_name={user_name}
                 user_profil={user_profil}
            />
        );
    }
}

export default withRouter(MeetingScreen);