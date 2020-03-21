import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from "../assets/cofund.svg";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Nav() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Link href="/" variant="body2">
                    <img src={Logo} style={{width: 128, height: 128}} alt="CoFund Logo" />
                </Link>
                <Typography component="h1" variant="h5">
                    List of all frontend designs available
                </Typography>
                <Link href="/" variant="body2">
                    <Typography component="h1" variant="h6">
                        Home
                    </Typography>
                </Link>
                <Link href="/list" variant="body2">
                    <Typography component="h1" variant="h6">
                        CompanyList
                    </Typography>
                </Link>
                <Link href="/getit" variant="body2">
                    <Typography component="h1" variant="h6">
                        InvitationCode
                    </Typography>
                </Link>
                <Link href="/signup" variant="body2">
                    <Typography component="h1" variant="h6">
                        SignUp
                    </Typography>
                </Link>
                <Link href="/showmethemoney" variant="body2">
                    <Typography component="h1" variant="h6">
                        DonationOverview
                    </Typography>
                </Link>
                <Link href="/payoutdetails" variant="body2">
                    <Typography component="h1" variant="h6">
                        PayoutDetails
                    </Typography>
                </Link>
                <Link href="/payment" variant="body2">
                    <Typography component="h1" variant="h6">
                        Payment
                    </Typography>
                </Link>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
