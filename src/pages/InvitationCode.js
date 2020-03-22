import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Logo from "../assets/cofund.svg";
import {SET_CODE, SET_PLACE, useCompanyContext} from '../context/CompanyContext';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.cofound.de">
                CoFund
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function InvitationCode() {
    const classes = useStyles();
    const history = useHistory();
    const [_, dispatch] = useCompanyContext();

    const [inviteCode, setInviteCode] = useState(null);

    function login(event) {
        event.preventDefault();
        fetch('/api/entrepreneurs/invitationtokens', {
            method: "POST", headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({invitationToken: inviteCode})
        }).then(response => {
            return response.json()
        }).then(place => {
            dispatch({type: SET_PLACE, payload: place});
            dispatch({type: SET_CODE, payload: inviteCode});
            if (place.email) {
                history.push('/showmethemoney')
            } else {
                history.push('/signup')
            }
        }).catch((error) => {
            alert("something went wrong here");
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Link href="/" variant="body2">
                    <img src={Logo} style={{width: 128, height: 128}} alt="CoFund Logo" />
                </Link>
                <Typography component="h1" variant="h5">
                    Access your donations
                </Typography>
                <form className={classes.form} noValidate onSubmit={login}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="invitationcode"
                            label="Invitation Code"
                            name="invitationcode"
                            autoFocus
                            onChange={(event) => setInviteCode(event.target.value)}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!inviteCode || inviteCode.length === 0}
                    >
                        Go get it
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
