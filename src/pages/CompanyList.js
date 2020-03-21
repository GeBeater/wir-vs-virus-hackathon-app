import styled from "styled-components";
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import {REMOVE_PLACE, useAppContext} from "../context/AppContext";
import {PlaceTile} from "./PlaceTile";

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
    header: {
        textAlign: 'left'
    }
}));

export default function CompanyList() {
    const [{google, places}, dispatch] = useAppContext();

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
    };

    const handleDeleteTile = value => () => {
        dispatch({type: REMOVE_PLACE, payload: value});
    };

    const hasPlaces = !!places.length;

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
                            {hasPlaces && places.map(place =>
                                <PlaceTile
                                    key={place.id}
                                    place={place}
                                    showCheckbox={true}
                                    isChecked={checked.indexOf(place.place_id) !== -1}
                                    handleToggle={handleToggle}
                                    showDeleteBtn={true}
                                    handleDelete={handleDeleteTile} />
                                )}
                            {!hasPlaces && (
                                <Typography component="h6" variant="h6">
                                    No places selected
                                </Typography>
                            )}
                        </List>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!hasPlaces}
                        >
                            Pay now
                    </Button>
                    </form>
                    <Button component={Link} to="/home" variant="contained" color="primary" disableElevation fullWidth={true} >
                        back to the map
                    </Button>
                </div>
            </Container>
            <Container component="main" maxWidth="md" className={classes.container}>
                <div className={classes.map}>
                    <MapContainer>
                        {/*<MapRef ref={mapRef} />*/}
                        {/*{!loading &&*/}
                        {/*    React.Children.map(this.props.children, child => {*/}
                        {/*        return React.cloneElement(child, { map, maps });*/}
                        {/*    })}*/}
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
