import React, {Component} from 'react';

class UserViewer extends Component {

    render() {
        const users = this.props.users;
        try {
            return (
                <div className="UserViewer">
                    <ul>
                        {users.map((user) => {
                                return <li>{user.name}</li>
                            }
                        )}
                    </ul>
                </div>
            );
        } catch (error) {
            return (
                <div className="UserViewer">
                    Error : {error.toString()}
                </div>
            );
        }
    }
}

export default UserViewer;
