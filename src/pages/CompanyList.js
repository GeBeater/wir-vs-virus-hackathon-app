import styled from "styled-components";
import useGoogleMap from "../maps/useGoogleMaps";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(theme => ({
    paper: {
        fontFamily: "Helvetica Neue",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
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
        padding: theme.spacing(2),
        fontWeight: 'bold'
    },
    list: {
        width: '100%',
        maxWidth: 1000,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    map: {
        width: '100%',
    },
    listitem: {
        borderBottom: '1px solid lightgrey',
        padding: '20px'
    },
    header: {
        textAlign: 'left'
    },
    listheader: {
        color: 'grey',
        fontSize: '15px'
    },
    checkbox: {
        color : 'grey',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: fade(theme.palette.common.black, 0.05),
        }
    }
}));

export default function CompanyList() {
    const { maps, map, mapRef, loading } = useGoogleMap(3, { lat: 3, lng: 3 });

    const classes = useStyles();

    const [checked, setChecked] = React.useState([1]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    return (
        <Container component="main" maxWidth="lg" className={classes.container}>
            <CssBaseline />
            <Container component="main" maxWidth="md" className={classes.container}>
                <div className={classes.paper}>
                    <div className={classes.header}>
                        <Typography component="h1" variant="h4" className={classes.h1}>
                            Good Choice!
                        </Typography>
                        <Typography component="h1" variant="h4" className={classes.h1}>
                            Tell us how much money you would like to donate
                        </Typography>
                    </div>

                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="donation"
                                    label="Your Amount"
                                    type="number"
                                    id="donation"
                                    autoFocus
                                />
                            </Grid>
                        </Grid>

                        <List dense className={classes.list}>
                        {['Goldene Gans', 'Liebes Bisschen', 'Oak Store', 'Aurel Bar'].map(value => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem key={value} button className={classes.listitem}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${value + 1}`}
                                            src={`/static/images/avatar/${value}.jpg`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={`${value}`} className={classes.listheader}/>
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(value)}
                                            checked={checked.indexOf(value) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            className={classes.checkbox}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                        </List>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Pay now
                    </Button>
                    </form>
                </div>
            </Container>
            <Container component="main" maxWidth="md" className={classes.container}>
                <div className={classes.map}>
                    <MapContainer>
                        <MapRef ref={mapRef} />
                        {!loading &&
                            React.Children.map(this.props.children, child => {
                                return React.cloneElement(child, { map, maps });
                            })}
                    </MapContainer>
                </div>
            </Container>
        </Container>
    );
}

const MapContainer = styled.div`
    height: 100px;
`;

const MapRef = styled.div`
    height: 100px;
`;