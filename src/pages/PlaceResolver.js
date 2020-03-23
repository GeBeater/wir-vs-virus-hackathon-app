import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useAppContext, ADD_PLACE} from "../context/AppContext";
import {getPlaceDetails} from "../services/places";

export default function PlaceResolver() {
    const [{google}, dispatch] = useAppContext();
    const params = useParams();
    const history = useHistory();
    useEffect(() => {
        if (google) {
            const placeIdOrSlug = "ChIJgYimH4aFsUcRu8NLjRdqwQ4" || params.placeIdOrSlug;
            if (!placeIdOrSlug) {
                history.push('/');
            }
            getPlaceDetails(placeIdOrSlug).then((details) => {
                dispatch({type: ADD_PLACE, payload: {details, amount: 0}});
                history.push('/checkout');
            }).catch(error => {
                history.push('/');
            });
        }
    }, [params, google])
    return (
        <div></div>
    )
}