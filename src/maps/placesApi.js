import axios from 'axios';
import {apiKey} from "./apiKey";

export const getPlaceDetails = (placeId) =>
    axios
        .get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${placeId}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
        .then(res => res.data)
        .catch(error => {
            console.log('ERROR', error);
            throw error;
        });
