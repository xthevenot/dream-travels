import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '@/public/images/exoticca-logo-white.png'
import smallLogo from '@/public/images/exoticca-logo-black-small.png'
import Modal from 'react-modal';
import CreateTrip from './forms/create-trip';
import customStyles from '@/utils/utils'
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Countdown from 'react-countdown';
import { useTrips, useTripsDispatch } from '@/lib/trips-context';
import { Trip } from '@/lib/endpoint';
import { PlusIcon } from '@heroicons/react/24/outline';

export type CountDownCookie = {
    deadline: number,
    tripId: number
}

function Header() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const originalCookie = getCookie('countDownToTravel') ? JSON.parse(getCookie('countDownToTravel') as string) : undefined;
    const [countDownToTravel, setCountDownToTravel] = useState<CountDownCookie | undefined>(originalCookie);
    const [selectedRandomTrip, setSelectedRandomTrip] = useState<Trip | null>();
    const dispatch = useTripsDispatch();
    const trips = useTrips();

    useEffect(() => {
        if (trips && originalCookie) {
            const selectedTrip = trips.find((trip) => trip.id === originalCookie.tripId);
            if (selectedTrip) {
                setSelectedRandomTrip(selectedTrip);
            }
            else {
                //Means we've just delete the selectedRandomTrip, so we reinitialize the counter
                setSelectedRandomTrip(null);
                deleteCookie('countDownToTravel');
                setCountDownToTravel(undefined);
            }
        }
    }, [trips])

    useEffect(() => {
        if (selectedRandomTrip) {
            //Set the selected trip to be "random = true"
            dispatch({
                type: 'updateRandom',
                tripId: selectedRandomTrip?.id
            })
        }
    }, [selectedRandomTrip])

    const renderer = ({
        days, hours, minutes, seconds, completed }
        : {
            days: number, hours: number, minutes: number, seconds: number, completed: boolean
        }) => {
        if (completed) {
            // Render a completed state
            return <span>You are good to go!</span>;
        } else {
            // Render a countdown
            return <span>Your trip to {selectedRandomTrip?.title} starts in
                {
                    days > 1 && ` ${days} days`
                }
                {
                    days < 1 && ` ${hours}:${minutes}:${seconds}`
                }
            </span>;
        }
    };

    function getRandomTrip(min = 0, max = trips.length - 1) {
        const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
        const randomTrip = trips.find((trip, $index) => $index === randomIndex);
        setSelectedRandomTrip(randomTrip);
        return randomTrip as Trip;
    }

    function onRandomTripSelected() {
        let inThreeMonth = new Date();
        inThreeMonth.setMonth(inThreeMonth.getMonth() + 3);
        const randomTrip: Trip = getRandomTrip();
        const newCookie: CountDownCookie = {
            deadline: inThreeMonth.getTime(),
            tripId: randomTrip.id
        }
        setCookie('countDownToTravel', newCookie);
        setCountDownToTravel(newCookie);
        dispatch({
            type: 'randomStart',
            tripId: newCookie.tripId
        })
    }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <>
            <header className="bg-black text-white p-4 flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Image className='block sm:hidden invert' src={smallLogo} alt='Dream Trips by Exoticca - logo' />
                    <Image className='hidden sm:block' src={logo} alt='Dream Trips by Exoticca' />
                </div>
                <button disabled={countDownToTravel !== undefined} className="bg-green-600 text-white px-4 py-2" onClick={(e) => {
                    onRandomTripSelected();
                }}>
                    {
                        !countDownToTravel && 'Choose a destination for me!'
                    }
                    {
                        countDownToTravel && <Countdown
                            date={Number(countDownToTravel.deadline)}
                            renderer={renderer}
                        />
                    }
                </button>
                <button className="bg-white text-black px-4 py-2" onClick={openModal} value={'hola'}>
                    <PlusIcon className='block sm:hidden' width={20} height={20} />
                    <label className='hidden sm:block'>Create new trip</label>
                </button>
            </header>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <CreateTrip closeModal={closeModal} />

            </Modal>
        </>

    )
}

export default Header