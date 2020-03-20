import React, {useEffect} from 'react';
import styled from "styled-components";
import Map from '../maps/Map';

export default function Home() {
    useEffect(() => {

    }, []);
    return (
        <Container>
            <SearchBar>
                <SearchField autoFocus placeholder="Search your location..."></SearchField>
            </SearchBar>
            <Map
                zoom={13}
                center={{lat: 53.551086, lng: 9.993682}}
            />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 75px);
`;
const SearchBar = styled.header`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
    padding: 10px 20px;
    height: 75px;
    background-color: rgba(230,230,230);
`;

const SearchField = styled.input`
    text-indent: 10px;
    text-align:left;
    font-size: 1.5em;
    color: palevioletred;
    height: 100%;
    width: 100%;
    outline: 0;
    margin:0;
    border:0;
    border-radius: 10px;
    background-color: rgba(220,220,220);
    &::placeholder {
        opacity: 0.5;
        color: palevioletred;
    }
`;
