const placeTypeBlacklist = [
    'accounting',
    'airport',
    'amusement_park',
    'atm',
    'bank',
    'bus_station',
    'hospital',
    'insurance_agency',
    'lawyer',
    'library',
    'light_rail_station',
    'local_government_office',
    'mosque',
    'park',
    'parking',
    'police',
    'post_office',
    'primary_school',
    'school',
    'secondary_school',
    'shopping_mall',
    'stadium',
    'subway_station',
    'synagogue',
    'taxi_stand',
    'tourist_attraction',
    'train_station',
    'transit_station',
    'university'
];

export const placeTypeWhitelist = [
    'aquarium',
    'art_gallery',
    'bakery',
    'bar',
    'beauty_salon',
    'bicycle_store',
    'book_store',
    'bowling_alley',
    'cafe',
    'campground',
    'car_dealer',
    'car_rental',
    'car_repair',
    'car_wash',
    'clothing_store',
    'convenience_store',
    'department_store',
    'drugstore',
    'electrician',
    'electronics_store',
    'florist',
    'funeral_home',
    'furniture_store',
    'gas_station',
    'grocery_or_supermarket',
    'gym',
    'hair_care',
    'hardware_store',
    'home_goods_store',
    'jewelry_store',
    'laundry',
    'liquor_store',
    'locksmith',
    'lodging',
    'meal_delivery',
    'meal_takeaway',
    'movie_rental',
    'movie_theater',
    'moving_company',
    'museum',
    'night_club',
    'painter',
    'pet_store',
    'pharmacy',
    'physiotherapist',
    'plumber',
    'real_estate_agency',
    'restaurant',
    'roofing_contractor',
    'rv_park',
    'shoe_store',
    'spa',
    'storage',
    'store',
    'supermarket',
    'travel_agency',
    'veterinary_care',
    'zoo',
];

export const isValidPlace = (details, status, google) => {
    // check status
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return false;
    }

    // check if address is complete
    const {address_components} = details;
    if (!address_components) {
        return false;
    }
    const hasRoute = address_components.filter(cmp => cmp.types && cmp.types.indexOf('route') >= 0).length >= 0;
    const hasStreetNumber = address_components.filter(cmp => cmp.types && cmp.types.indexOf('street_number') >= 0).length > 0;

    return hasRoute && hasStreetNumber;
};

export const isSupportedType = (details) => {
    const {types} = details;
    if (!types) {
        return false;
    }

    return types.filter(t => placeTypeWhitelist.indexOf(t) >= 0).length > 0;
};


