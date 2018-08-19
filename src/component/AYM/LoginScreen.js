import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import AYMUserMenu from '../AYMUserMenu';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    menuButton: {
        marginLeft: -5,
        marginRight: 20,
    },
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
        borderRadius: '50px',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        var current_user = localStorage.getItem('current_user', JSON.stringify(this.state));

        if (current_user == null) {
            this.state = {
                user_name: 'Maxime',
                user_profil: 'learner',
            };
        } else {
            current_user = JSON.parse(current_user);
            this.state = current_user;
        }

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Update component state on each change
     * @param event
     */
    handleChange(event) {
        if (event.target.id === 'user_avatar') {
            const file = event.target.files[0];
            getBase64(file).then(base64 => {
                localStorage["user_avatar_tmp"] = base64;
                console.debug("file stored", base64);
            });
        }

        // Update a partial state
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    imageUpload = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            localStorage["user_avatar_tmp"] = base64;
            console.debug("file stored", base64);
        });
    };

    /**
     * Update component state on each change
     * @param event
     */
    handleSubmit(event) {
        this.state.user_avatar = localStorage.getItem("user_avatar_tmp");
        localStorage.setItem('current_user', JSON.stringify(this.state));
        localStorage.removeItem("user_avatar_tmp");
        this.props.history.push('/', this.state)
    }

    /**
     * Log out current user
     * @param event
     */
    logOut(event) {
        localStorage.removeItem("user_avatar_tmp");
        localStorage.removeItem("current_user");
        this.props.history.push('/', this.state)
    }

    render() {
        const {classes} = this.props;
        var current_user = localStorage.getItem('current_user');

        if (current_user == null) {
            return (
                <div className="LoginScreen">
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                    <FontAwesomeIcon color="inherit" aria-label="Menu"
                                                     icon="arrow-circle-left"
                                                     style={{left: 0, top: 24, width: 24, height: 24}}
                                                     onClick={() => this.props.history.goBack()}/>
                                </IconButton>
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                    Animate your meeting
                                </Typography>
                                {/*<Button color="inherit">Login</Button>*/}
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div className={classes.root} style={{padding: "40px"}}>
                        <Typography variant="title" color="inherit">
                            Connect to AYM
                        </Typography>
                    </div>
                    <form onSubmit={() => this.handleSubmit()}>
                        <div className={classes.margin}>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <FontAwesomeIcon icon="font" style={{left: 0, top: 24, width: 24, height: 24}}/>
                                </Grid>
                                <Grid item>
                                    <TextField id="user_name"
                                               type="text"
                                               value={this.state.user_name}
                                               onChange={this.handleChange}
                                               label="Your name :"/>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.margin}>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <FontAwesomeIcon icon="chalkboard-teacher" style={{left: 0, top: 24, width: 24, height: 24}}/>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="user_profil"
                                        select
                                        label="Profil"
                                        value={this.state.user_profil}
                                        onChange={this.handleChange}
                                        SelectProps={{
                                            native: true,
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                    >
                                        {profils.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.margin}
                             style={{position: 'relative', marginTop: '25px'}}>
                            <div>
                                <InputLabel htmlFor="input-with-icon-adornment">Choose your avatar</InputLabel>
                            </div>
                            <FontAwesomeIcon icon="user" style={{left: 0, top: 24, width: 24, height: 24}}/>
                            <input label="Upload file :"
                                   id="user_avatar"
                                   type="file"
                                   ref={this.avatarInput}
                                   style={{paddingLeft: '25px', marginTop: '15px'}}
                                   onChange={this.handleChange}
                                   accept="image/*"/>
                        </div>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}
                                style={{marginTop: '30px'}}>
                            <FontAwesomeIcon className={classes.leftIcon} icon="sign-in-alt"/>
                            Log in
                        </Button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="OpenMeetingScreen">
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                    <FontAwesomeIcon color="inherit" aria-label="Menu"
                                                     icon="arrow-circle-left"
                                                     style={{left: 0, top: 24, width: 24, height: 24}}
                                                     onClick={() => this.props.history.goBack()}/>
                                </IconButton>
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                    Animate your meeting
                                </Typography>
                                <AYMUserMenu />
                            </Toolbar>
                        </AppBar>
                    </div>
                    <Button variant="contained" color="primary" className={classes.button}
                            style={{marginTop: '30px'}}
                            onClick={() => this.logOut()}
                    >
                        <FontAwesomeIcon className={classes.leftIcon} icon="sign-out-alt"/>
                        Log out
                    </Button>
                </div>
            );
        }

    }
}

const profils = [
    {
        value: 'trainer',
        label: 'Trainer',
    },
    {
        value: 'learner',
        label: 'Learner',
    },
];

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

export default withRouter(withStyles(styles)(LoginScreen));
