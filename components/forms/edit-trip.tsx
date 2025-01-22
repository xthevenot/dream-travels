import { Itinerary, Trip } from '@/lib/endpoint';
import { useTripsDispatch } from '@/lib/trips-context';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'

function EditTrip({
    trip,
    closeModal
}: {
    trip: Trip,
    closeModal: Function
}) {

    const newItinerary: Itinerary = {
        day: 0,
        description: '',
        location: ''
    }
    const [itineraries, setItineraries] = useState<Itinerary[]>(trip.itinerary);
    const dispatch = useTripsDispatch();

    function handleAddItinerary() {
        setItineraries([...itineraries, { ...newItinerary, id: itineraries.length }])
    }

    function returnFormattedItineraries(formData: FormData): Itinerary[] {
        let formattedItineraries: Itinerary[] = [];
        itineraries.map((itinerary, $index) => {
            formattedItineraries.push({
                day: Number(formData.get(`day-${$index}`)),
                location: formData.get(`location-${$index}`) as string,
                description: formData.get(`description-${$index}`) as string
            });
        });
        return formattedItineraries;
    }

    function dispatchTripEdition(formData: FormData) {
        const updatedTrip: Trip = {
            id: trip.id,
            title: formData.get("name") as string,
            introduction: formData.get("introduction") as string,
            description: formData.get("description") as string,
            photo_url: formData.get("photo_url") as string,
            status: trip.status,
            itinerary: returnFormattedItineraries(formData)
        }

        dispatch({
            type: 'updated',
            trip: updatedTrip
        })

        closeModal();
    }
    return (
        <div className="flex justify-center items-center rounded-md bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-mg max-w-lg w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Edit a trip</h2>
                    <button title='Close popup' className="bg-black rounded-full w-6 text-white" onClick={() => {
                        closeModal();
                    }}>x</button>
                </div>

                <form action={dispatchTripEdition}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label>
                        <input
                            type="text"
                            defaultValue={trip.title}
                            id="name"
                            name="name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Italy"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
                            Introduction (max. 240 characters)
                        </label>
                        <textarea
                            id="introduction"
                            defaultValue={trip.introduction}
                            name="introduction"
                            rows={2}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="From Rome to Venice..."
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            defaultValue={trip.description}
                            name="description"
                            rows={4}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Discover the wonders of the Roman empire..."
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="photo_url" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="text"
                            id="photo_url"
                            defaultValue={trip.photo_url}
                            name="photo_url"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Image URL"
                        />
                    </div>

                    {/* Itineraries */}
                    <div className="mb-4">
                        <div className='flex justify-between items-center'>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2 text-left">Day by day itinerary</label>
                            <button title='Add an itinerary' type='button' onClick={(e) => {
                                e.stopPropagation();
                                handleAddItinerary()
                            }}>
                                <PlusCircleIcon width={20} height={20} />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        {
                            itineraries.map((itinerary, $index) => (
                                <div key={$index} className="grid grid-cols-3 gap-2 mb-2 p-5 bg-gray-100 rounded-3xl relative">
                                    <div className='w-100'>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-blue-500 focus:border-blue-500"
                                            id={`day-${$index}`}
                                            name={`day-${$index}`}
                                            defaultValue={itinerary.day}
                                        >
                                            <option>Day</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>

                                    <div className='col-span-2'>
                                        <input
                                            type="text"
                                            id={`location-${$index}`}
                                            name={`location-${$index}`}
                                            defaultValue={itinerary.location}
                                            placeholder="Location"
                                            className="w-full col-span-1 p-2 border border-gray-300 rounded-3xl focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            id={`description-${$index}`}
                                            name={`description-${$index}`}
                                            defaultValue={itinerary.description}
                                            rows={4}
                                            className="mt-1 w-full col-span-1 p-2 border border-gray-300 rounded-3xl focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="text-left">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTrip