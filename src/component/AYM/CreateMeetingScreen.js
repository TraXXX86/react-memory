import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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

class CreateMeetingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.pptInput = React.createRef();
        this.avatarInput = React.createRef();

        var current_user = localStorage.getItem('current_user');
        current_user =  JSON.parse(current_user);

        this.state = {
            user_name: current_user.user_name,
            user_profil: current_user.user_profil,
            meeting_id: '5b7438ec4de4b',
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

    handleSubmit(event) {
        event.preventDefault();
        if (this.pptInput.current.files[0] != null) {
            var inputFile = this.pptInput.current.files[0];

            var fileReader = new FileReader();
            fileReader.readAsBinaryString(inputFile);

            alert(
                `Selected file - ${
                    inputFile.name
                    }`
            );
        } else {
            alert(
                `No file selected`
            );
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={{flex: 1}}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <FontAwesomeIcon color="inherit" aria-label="Menu"
                                                 icon="arrow-circle-left"
                                                 style={{left: 0, top: 24, width: 24, height: 24}}
                                                 onClick={() => this.props.history.push('/')}/>
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Animate your meeting
                            </Typography>
                            <AYMUserMenu />
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.root} style={{padding: "40px"}}>
                    <Typography variant="title" color="inherit">
                        Configure your meeting
                    </Typography>
                </div>
                <form onSubmit={() => this.props.history.push('/meeting', this.state)}>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <FontAwesomeIcon icon="globe" style={{left: 0, top: 24, width: 24, height: 24}}/>
                            </Grid>
                            <Grid item>
                                <TextField id="meeting_id"
                                           value={this.state.meeting_id}
                                           onChange={this.handleChange}
                                           label="Choose a meeting room :"/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.margin}
                         style={{position: 'relative', marginTop: '25px'}}>
                        <div>
                            <InputLabel htmlFor="input-with-icon-adornment">Add your PowerPoint</InputLabel>
                        </div>
                        <FontAwesomeIcon icon="file-powerpoint" style={{left: 0, top: 24, width: 24, height: 24}}/>
                        <input label="Upload file :"
                               id="input-with-icon-grid"
                               type="file"
                               ref={this.pptInput}
                               style={{paddingLeft: '25px', marginTop: '15px'}}
                               accept=".ppt,.pptx"/>
                    </div>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}
                            style={{marginTop: '30px'}}>
                        <FontAwesomeIcon className={classes.leftIcon} icon="check"/>
                        Create
                    </Button>
                </form>
            </div>)
    }
}

CreateMeetingScreen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CreateMeetingScreen));