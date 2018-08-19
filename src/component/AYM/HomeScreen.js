import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AYMUserMenu from '../AYMUserMenu';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -5,
        marginRight: 20,
    },
    button: {
        margin: theme.spacing.unit,
        borderRadius: '50px',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class Home extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div style={{flex: 1}}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <FontAwesomeIcon color="inherit" aria-label="Menu"
                                                 icon="home"
                                                 style={{left: 0, top: 24, width: 24, height: 24}}/>
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Animate your meeting
                            </Typography>
                            <AYMUserMenu />
                        </Toolbar>
                    </AppBar>
                </div>
                <div style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{flex: 1}}>
                        <div className={classes.root} style={{padding: "40px"}}>
                            <Typography variant="title" color="inherit">
                                What are you doing?
                            </Typography>
                        </div>
                    </div>
                    <div style={{flex: 1, marginBottom: 10, marginTop: 50}}>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => {
                                    this.props.history.push('/create_meeting')
                                }}>
                            <FontAwesomeIcon className={classes.leftIcon} icon="plus-circle"/>
                            Create a new meeting
                        </Button>
                    </div>
                    <div style={{flex: 1}}>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => {
                                    this.props.history.push('/open_meeting')
                                }}>
                            <FontAwesomeIcon className={classes.leftIcon} icon="sign-in-alt"/>
                            Join a meeting
                        </Button>
                    </div>
                </div>
            </div>)
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Home));