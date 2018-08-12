import React, {Component} from 'react';

class UserViewer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const users = this.props.users;
        try {
            return (
                <div className="UserViewer" >
                    <ul>
                        {users.map((user) => {
                            if(user.name != 'Psio'){
                                   return <li>{user.name}</li>
                                }
                            }
                        )}
                    </ul>
                </div>
            );
        } catch (error) {
            return (
                <div className="UserViewer" >
                    Error : {error.toString()}
                </div>
            );
        }
    }
}

export default UserViewer;
