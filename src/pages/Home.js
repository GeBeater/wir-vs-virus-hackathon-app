import {makeStyles} from "@material-ui/core/styles";
import React from 'react';
import {useAppContext} from "../context/AppContext";
import {HeaderBar} from "../components/HeaderBar";
import HomeMap from "../maps/HomeMap";
import {HomeSideBar} from "../components/HomeSidebar";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
    },
    mapContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 56,
        bottom: 0,
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            top: 64
        }
    }
}));

export default function Home() {
    const classes = useStyles();
    const [{places}] = useAppContext();

    return (
        <div className={classes.root}>
            <HeaderBar />
            <div className={classes.mapContainer}>
                <HomeSideBar/>
                <HomeMap />
            </div>
        </div>
    );
}
