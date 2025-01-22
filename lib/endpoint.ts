export type Itinerary = {
    id?: number;
    day: number,
    location: string,
    description: string
}
export type Trip = {
    randomStart?: boolean,
    id: number,
    title: string,
    description: string,
    photo_url: string,
    introduction: string,
    status: string,
    itinerary: Itinerary[],
}

/**
 * Return if any itinerary matches with searchInput
 * @param {Array} itineraries 
 * @param {String} searchInput 
 * @returns true or false
 */
function filterItineraries(itineraries: Itinerary[], searchInput: string): boolean {
    return itineraries.some((itinerary: Itinerary) => {
        return itinerary.description.toLowerCase().search(searchInput.toLowerCase()) !== -1 || itinerary.location.toLowerCase().search(searchInput.toLowerCase()) !== -1;
    })
}

/**
 * Return filtered trips
 * @param {Array} trips original list of trips
 * @param {String} searchInput the filter input
 * @returns a new filtered array
 */
export async function filterTrips(trips: Trip[], searchInput: string, pathname: string) {
    // Artificially delay a response for demo purposes.
    await new Promise((resolve) => setTimeout(resolve, 400));
    let status: string = 'all';
    switch (pathname) {
        case "/upcoming":
            status = 'todo'
            break;
        case "/completed":
            status = 'done'
            break;
        default:
            break;
    }

    return trips.filter(function (trip: Trip) {
        if (searchInput) {
            return (status === 'all' || trip.status === status) && (trip.title.toLowerCase().search(searchInput.toLowerCase()) !== -1
                || trip.description.toLowerCase().search(searchInput.toLowerCase()) !== -1
                || trip.introduction.toLowerCase().search(searchInput.toLowerCase()) !== -1
                || filterItineraries(trip.itinerary, searchInput));
        }
        return status === 'all' || trip.status === status;
    });
}

