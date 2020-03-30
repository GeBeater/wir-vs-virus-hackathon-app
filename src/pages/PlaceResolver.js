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
            const placeIdOrSlug = params.placeIdOrSlug;
            if (!placeIdOrSlug) {
                history.push('/');
            }
            fetch(`/api/places/resolve/${placeIdOrSlug}`).then(response => {
                return response.json()
            }).then(entrepreneur => {
                performPlaceRequest(entrepreneur.googlePlaceId);
            }).catch((error) => {
                performPlaceRequest(placeIdOrSlug)
            })
        }
    }, [params, google])

    function performPlaceRequest(placeId) {
        getPlaceDetails(placeId).then((details) => {
            dispatch({type: ADD_PLACE, payload: {details, amount: params.amount ? params.amount : 0}});
            history.push('/checkout');
        }).catch(error => {
            history.push('/');
        });
    }

    return (
        <div></div>
    )
}
