import React from 'react'

function TripsList() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Trip Item */}
            {[
                {
                    image: 'https://via.placeholder.com/150',
                    title: 'Portugal',
                    description:
                        "Classic tour of Portugal's vibrant cities and cultural heritage, including Lisbon, Porto, Fatima and the flamboyant architecture of Sintra.",
                },
                {
                    image: 'https://via.placeholder.com/150',
                    title: 'Norway',
                    description:
                        "Lose yourself in the magical beauty of the natural wonders Norway has to offer; from colossal Nordic landscapes such as the otherworldly Fjord of Dreams.",
                },
                {
                    image: 'https://via.placeholder.com/150',
                    title: 'Vietnam & Cambodia',
                    description:
                        "A fascinating journey of discovery through Vietnam, Cambodia and Thailand!",
                },
            ].map((trip, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-lg flex overflow-hidden"
                >
                    <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-1/3 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between w-2/3">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{trip.title}</h2>
                            <p className="text-gray-600 mb-4">{trip.description}</p>
                        </div>
                        <div className="flex justify-between text-sm text-blue-500">
                            <a href="#" className="hover:underline">
                                See trip details
                            </a>
                            <div className="space-x-4">
                                <a href="#" className="hover:underline">
                                    Edit
                                </a>
                                <a href="#" className="hover:underline">
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TripsList