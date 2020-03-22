import {makeStyles, Paper} from '@material-ui/core';
import InputBase from "@material-ui/core/InputBase";
import {debounce} from "lodash";
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import SearchIcon from "../assets/search.svg";
import {useAppContext} from '../context/AppContext';
import {colors, spacing} from '../theme/theme';

const useStyles = makeStyles(() => ({
    search: {
        backgroundColor: colors.grayA05,
        display: "flex",
        borderRadius: "4px",
        flexGrow: 1,
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

export default function Search({onSelected, location}) {
    const {t} = useTranslation();
    const classes = useStyles();
    let geocoder, autocompleteService;
    const [{_, google}] = useAppContext();
    const [results, setResults] = useState([]);
    const radiusInMeters = 10000;
    const [searchTerm, setSearchTem] = useState(null);
    const types = ['establishment']; // we could also define the exact types of establishments, see https://developers.google.com/places/supported_types#table3
    const debouncedSearch = debounce((value) => setSearchTem(value), 500);

    function search(term) {
        const searchRadius = new google.maps.Circle({center: location, radius: radiusInMeters});

        if (!autocompleteService) {
            autocompleteService = new google.maps.places.AutocompleteService();
        }
        const options = {input: term, types: types, bounds: searchRadius.getBounds(), strictBounds: true};
        autocompleteService.getPlacePredictions(options, displaySuggestions);
    }

    useEffect(() => {
        if (searchTerm) {
            search(searchTerm)
        }
    }, [searchTerm])

    function onSearchChange(event) {
        debouncedSearch(event.target.value)
    }

    const displaySuggestions = function (predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log('Search was not successful for the following reason: ' + status);
            return;
        } else {
            setResults(predictions);
        }
    };

    function onSelect(result) {
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
        }
        geocoder.geocode({'placeId': result.place_id}, function (resultList, status) {
            if (status === "OK" && resultList.length === 1) {
                const result = resultList[0];
                const newCenter = {lat: result.geometry.location.lat(), lng: result.geometry.location.lng(), placeId: result.place_id};
                onSelected(newCenter);
                setResults([])
            }
        });
    }
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className={classes.search}>
                <img src={SearchIcon} style={{width: 30, height: 30, color: colors.grayA50}} alt="CoFund Logo" />
                <InputBase
                    name="search"
                    placeholder={t('search.address')}
                    autoFocus
                    autoComplete="off"
                    onChange={onSearchChange}
                    classes={{root: classes.searchInput, input: classes.searchField}}
                />
            </form>
            <QuickSearch>
                {results.length > 0 &&
                    <Paper className={classes.results}>
                        {
                            results.map((result) => {
                                return <Result key={result.place_id} onClick={() => onSelect(result)}>{result.description}</Result>
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
    max-width: 50%;
    @media (max-width: 768px) { 
        left: 5px;
        right: 5px;
        width: 100%;
        max-width: 100%;
    }
`;

const Result = styled.div`
    line-height: 3em;
    padding: ${spacing.s} ${spacing.m};
    margin-left: -${spacing.m};
    margin-right: -${spacing.m};
    &:hover {
        background-color: ${colors.grayA05}
    }
`;
