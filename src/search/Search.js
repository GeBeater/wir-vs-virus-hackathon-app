import {makeStyles, Paper} from '@material-ui/core';
import InputBase from "@material-ui/core/InputBase";
import React, {useState} from 'react';
import styled from 'styled-components';
import SearchIcon from "../assets/search.svg";
import {useAppContext} from '../context/AppContext';
import {colors, spacing} from '../theme/theme';


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
    },
    results: {
        padding: `${spacing.s} ${spacing.m}`,
        color: colors.grayA80,
    }
}));

export default function Search({onSelected}) {
    const classes = useStyles();
    let geocoder;
    const [{_, google}] = useAppContext();
    const [results, setResults] = useState([]);

    function onSearch(event) {
        event.preventDefault();
        const searchTerm = event.target.search.value;
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
        }
        geocoder.geocode({'address': searchTerm}, function (results, status) {
            if (status === "OK") {
                if (results.length > 1) {
                    setResults(results)
                } else {
                    onSelect(results[0])
                }
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    function onSelect(result) {
        onSelected(result.geometry.location);
        setResults([])
    }
    return (
        <>
            <form onSubmit={onSearch} className={classes.search}>
                <img src={SearchIcon} style={{width: 30, height: 30, color: colors.grayA50}} alt="CoFund Logo" />
                <InputBase
                    name="search"
                    placeholder="Search for a business you want to support..."
                    autoFocus
                    classes={{root: classes.searchInput, input: classes.searchField}}
                />
            </form>
            <QuickSearch>
                {results.length > 0 &&
                    <Paper className={classes.results}>
                        {
                            results.map((result) => {
                                return <Result onClick={() => onSelect(result)}>{result.formatted_address}</Result>
                            })
                        }
                    </Paper>
                }
            </QuickSearch>
        </>
    )
}
const QuickSearch = styled.div`
    position: absolute;
    top: 60px;
    left: 80px;
    width: 25%;
`;

const Result = styled.div`
    cursor:pointer;
    margin-top: 0;
    line-height: 20px;
    padding: ${spacing.s} ${spacing.m};
    margin-left: -${spacing.m};
    margin-right: -${spacing.m};
    &:hover {
        background-color: ${colors.grayA05}
    }
`;