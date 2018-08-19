import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const styles = theme => ({
    badge: {
        left: -15,
        top: 20,

    },
});

class AYMAvatar extends React.Component {
    render() {
        const {classes} = this.props;
        var isTrainer = this.props.profil === 'trainer';

        if (this.props.img === null || this.props.img === '') {
            if (isTrainer) {
                return (
                    <Badge badgeContent={<FontAwesomeIcon icon="chalkboard-teacher" style={{left: 0, top: 24, width: 24, height: 24}}/>}
                           color="primary"
                           classes={{badge: classes.badge}}>
                        <Avatar alt={this.props.alt}>{this.props.initials}</Avatar>
                    </Badge>
                );
            }

            return (
                <Avatar alt={this.props.alt}>{this.props.initials}</Avatar>
            );
        }

        if (isTrainer) {
            return (
                <Badge badgeContent={<FontAwesomeIcon icon="chalkboard-teacher" style={{left: 0, top: 24, width: 24, height: 24}}/>}
                       color="primary"
                       classes={{badge: classes.badge}}>
                    <Avatar src={this.props.img} alt={this.props.alt}/>
                </Badge>
            );
        }

        return (<Avatar src={this.props.img} alt={this.props.alt}/>)
    }
}

export default withStyles(styles)(AYMAvatar);