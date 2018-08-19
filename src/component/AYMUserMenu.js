import React from 'react';
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AYMAvatar from './AYMAvatar';

class AYMUserMenu extends React.Component {
    render() {
        var current_user = localStorage.getItem('current_user');
        if (current_user == null) {
            this.props.history.push('/login');
            return null;
        } else {
            current_user = JSON.parse(current_user);
            var initials = intials(current_user.user_name);

            return (
                <div>
                    <Tooltip title={current_user.user_name}>
                        <IconButton
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => this.props.history.push('/login')}
                        >
                            <AYMAvatar img={current_user.user_avatar} initials={initials}
                                       alt={current_user.user_name} profil={current_user.user_profil}></AYMAvatar>

                        </IconButton>
                    </Tooltip>
                </div>
            )
        }
    }
}

function intials(cString) {
    var sInitials = "";
    var wordArray = cString.split(" ");
    for (var i = 0; i < wordArray.length; i++) {
        sInitials += wordArray[i].substring(0, 1).toUpperCase();
    }
    return sInitials;
}

export default withRouter(AYMUserMenu);