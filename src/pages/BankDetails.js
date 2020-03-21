import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../assets/cofund.svg';
import {fade} from "@material-ui/core";

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
    disabled: {
        backgroundColor: fade(theme.palette.common.black, 0.05)
    }
}));

export default function SignUp() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Link href="/" variant="body2">
                    <img src={Logo} style={{width: 128, height: 128}} alt="CoFund Logo" />
                </Link>
                <Typography component="h1" variant="h5">
                    Enter payout details
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="iban"
                                label="IBAN"
                                name="iban"
                                autoComplete="iban"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="bic"
                                label="BIC"
                                name="bic"
                                autoComplete="bic"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
