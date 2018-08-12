import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        margin: theme.spacing.unit,
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
                            {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>*/}
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Animate your meeting
                            </Typography>
                            {/*<Button color="inherit">Login</Button>*/}
                        </Toolbar>
                    </AppBar>
                </div>
                <div style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{flex: 1}}>
                        <h3>What are you doing?</h3>
                    </div>
                    <div style={{flex: 1, marginBottom: 10, marginTop: 50}}>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Create a new meeting
                            <FontAwesomeIcon className={classes.rightIcon} icon="plus-circle"/>
                        </Button>
                    </div>
                    <div style={{flex: 1}}>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Join a meeting
                            <FontAwesomeIcon className={classes.rightIcon} icon="sign-in-alt"/>
                        </Button>
                    </div>
                </div>
            </div>)
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);