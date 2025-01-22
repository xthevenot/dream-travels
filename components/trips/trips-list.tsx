import { filterTrips, Trip } from '@/lib/endpoint'
import { useTrips, useTripsDispatch } from '@/lib/trips-context'
import React, { useEffect, useState } from 'react'
import Loading from '../skeletons/loading';
import Modal from 'react-modal';
import customStyles from '@/utils/utils'
import DetailedTrip from '../forms/detailed-trip';
import { usePathname } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import EditTrip from '../forms/edit-trip';

function TripsList({ searchInput }: { searchInput: string }) {
    const [filteredTrips, setFilteredTrips] = useState<Trip[]>();
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>();
    const [selectedDetailedTrip, setSelectedDetailedTrip] = useState<Trip | null>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const trips = useTrips();
    const dispatch = useTripsDispatch();

    const pathname = usePathname();

    //Put the function as async to simulate real backend call
    useEffect(() => {
        setIsLoading(true);
        async function filterData() {
            setFilteredTrips(await filterTrips(trips, searchInput, pathname))
            setIsLoading(false);
        }
        if (trips) {
            filterData();
        }
    }, [trips, searchInput]);

    function handleDeleteElement(tripId: number) {
        dispatch({
            type: 'deleted',
            id: tripId
        })
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <div className="max-w-6xl space-y-6 mx-auto">
                        {/* Trip Item */}
                        {filteredTrips?.map((trip, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg flex overflow-hidden object-fill mx-5"
                            >
                                <img
                                    src={trip.photo_url}
                                    alt={trip.title}
                                    className="w-1/2 md:w-1/3 object-cover"
                                />
                                {/* <div className='w-1/3 object-cover'>
                        <Image src={trip.photo_url} alt={trip.title} />
                    </div> */}


                                <div className="p-4 flex flex-col justify-between w-2/">
                                    <div>
                                        <div className='flex items-center mb-2'>
                                            <h2 className="text-xl font-bold pr-1">{trip.title}</h2>
                                            {
                                                trip.randomStart && <p className='font-bold italic pt-1 text-green-600'>This trip will start soon!</p>
                                            }
                                            {
                                                trip.status === 'done' && <CheckCircleIcon width={20} height={20} title='Completed' />
                                            }
                                        </div>

                                        <p className="text-gray-600 mb-4">{trip.introduction}</p>
                                    </div>
                                    <div className="flex justify-between text-sm text-blue-500">
                                        <button className="hover:underline"
                                            onClick={() => {
                                                setSelectedDetailedTrip(trip);
                                                setSelectedTrip(null);
                                                setIsOpen(true);
                                            }}>
                                            See trip details
                                        </button>
                                        <div className="space-x-4">
                                            <button className="hover:underline"
                                                onClick={(e) => {
                                                    setSelectedDetailedTrip(null);
                                                    setSelectedTrip(trip);
                                                    setIsOpen(true);
                                                }}>
                                                Edit
                                            </button>
                                            <button className="hover:underline text-red-500"
                                                onClick={() => {
                                                    handleDeleteElement(trip.id)
                                                }}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {
                            filteredTrips?.length === 0 && <p className='text-center'>No result found</p>
                        }
                    </div>
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                {
                    selectedTrip && <EditTrip trip={selectedTrip} closeModal={closeModal} />
                }
                {
                    selectedDetailedTrip && <DetailedTrip trip={selectedDetailedTrip} closeModal={closeModal} />
                }

            </Modal>
        </>

    )
}

export default TripsList