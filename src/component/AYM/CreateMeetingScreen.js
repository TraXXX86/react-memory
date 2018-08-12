import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class CreateMeetingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${
                this.fileInput.current.files[0].name
                }`
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={{flex: 1}}>
                <form onSubmit={this.handleSubmit}>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Choose a meeting room :"/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Your name :"/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Your avatar :"/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.margin}>
                        <label>
                            Upload file:
                            <input type="file" ref={this.fileInput}/>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>)
    }
}

CreateMeetingScreen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateMeetingScreen);