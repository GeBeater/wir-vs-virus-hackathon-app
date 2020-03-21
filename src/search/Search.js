import {makeStyles} from '@material-ui/core';
import InputBase from "@material-ui/core/InputBase";
import React from 'react';
import SearchIcon from "../assets/search.svg";
import {colors, spacing} from '../theme/theme';
import {useAppContext} from '../context/AppContext';


const useStyles = makeStyles(() => ({
    search: {
        backgroundColor: colors.grayA05,
        display: "flex",
        borderRadius: "4px",
        width: "60%",
        padding: `${spacing.s} ${spacing.m}`,
        marginLeft: spacing.m
    },
    searchInput: {
        marginLeft: spacing.m,
        flexGrow: 1,
    },
    searchField: {
        '&::placeholder': {
            color: colors.grayA50,
            opacity: 1
        }
    }
}));

export default function Search({onSelected}) {
    const classes = useStyles();
    let geocoder;
    const [{_, google}] = useAppContext();

    function onSearch(event) {
        event.preventDefault();
        const searchTerm = event.target.search.value;
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
        }
        geocoder.geocode({'address': searchTerm}, function (results, status) {
            if (status === "OK") {
                onSelected(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    return (
        <form onSubmit={onSearch} className={classes.search}>
            <img src={SearchIcon} style={{width: 30, height: 30, color: colors.grayA50}} alt="CoFund Logo" />
            <InputBase
                name="search"
                placeholder="Search for a business you want to support..."
                autoFocus
                classes={{root: classes.searchInput, input: classes.searchField}}
            />
        </form>
    )
}