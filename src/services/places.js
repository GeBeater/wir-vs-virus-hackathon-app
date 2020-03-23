let service
export function initService(google) {
    service = new google.maps.places.PlacesService(document.createElement('div'));
}
export function getPlaceDetails(id) {
    return new Promise((resolve, reject) => {
        service.getDetails({
            placeId: id,
            fields: ['id', 'name', 'place_id', 'icon', 'address_components', 'types', 'photos', 'formatted_address']
        }, (details, status) => {
            if (status === "OK") {
                resolve(details);
            } else {
                reject(new Error("Coould not fetch"));
            }
        });
    });
}