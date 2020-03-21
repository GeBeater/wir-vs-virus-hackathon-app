import React, {useEffect} from 'react';
import styled from "styled-components";
import useGoogleMap from "../maps/useGoogleMaps";

export default function List() {
    const { maps, map, mapRef, loading } = useGoogleMap( 3, {lat: 3, lng: 3});

    useEffect(() => {

    }, []);
    return (
        <Container>
             <ListContainer>
                 <CompanyList>
                     <li>COYO GmbH</li>
                     <li>mindsmash GmbH</li>
                 </CompanyList>
             </ListContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 75px);
`;

const ListContainer = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const CompanyList = styled.div`
    list-style: none;  
`;