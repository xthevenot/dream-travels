import { Trip } from '@/lib/endpoint';
import { useTrips, useTripsDispatch } from '@/lib/trips-context';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'

function DetailedTrip({
    trip,
    closeModal
}: {
    trip: Trip,
    closeModal: Function
}) {
    const [detailedTrip, setDetailedTrip] = useState<Trip>(trip);
    const dispatch = useTripsDispatch();

    useEffect(() => {
        setDetailedTrip(trip);
    }, [trip]);

    function onChangeStatus() {
        let newStatus = trip.status === 'done' ? 'todo' : 'done';
        dispatch({
            type: 'changeStatus',
            trip: trip,
            status: newStatus
        })
        //Update status
        setDetailedTrip({
            ...trip,
            status: newStatus
        });
    }

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-mg max-w-2xl w-full">
                <div className='relative'>
                    <img src={detailedTrip.photo_url} alt={detailedTrip.title} className="w-full h-64 object-cover" />
                    <button title='Close popup' className="bg-black rounded-full w-6 text-white absolute top-2 right-2" onClick={() => {
                        closeModal();
                    }}>x</button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Title and description */}
                    <h1 className="text-2xl font-bold text-gray-800">{detailedTrip.title}</h1>
                    <button className={(detailedTrip.status === 'done' ? 'text-green-700' : 'text-gray-400') + ' flex justify-center items-center gap-1 pt-2'}
                        onClick={() => {
                            onChangeStatus()
                        }}>
                        <CheckCircleIcon width={20} height={20} />
                        {detailedTrip.status === 'done' ? 'Completed, but let\'s do it again!' : 'Mark as completed'}
                    </button>
                    <p className="mt-4 text-gray-600">
                        {detailedTrip.description}
                    </p>

                    {/* Itinerary */}
                    <div className="mt-8 border-t">
                        <h2 className="pt-2 text-xl font-semibold text-gray-800">Itinerary</h2>
                        <div className="mt-6">
                            {
                                detailedTrip.itinerary.map((itinerary) => (
                                    <div key={itinerary.day}
                                        className="flex items-start">
                                        <div className="w-4 h-4 bg-gray-800 rounded-full mt-1.5"></div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-800">{`Day ${itinerary.day}: ${itinerary.location}`}</h3>
                                            <p className="text-gray-600 mt-2">
                                                {itinerary.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DetailedTrip