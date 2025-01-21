import React from 'react'
import Search from './search-input'
import Toggle from './group-buttons'
import TripsList from './trips-list'
import Header from './header'

function TripsView() {
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Header */}
            <Header />

            {/* Search Section */}
            <Search placeholder='Search trips' />

            {/* Button Group */}
            <Toggle />

            {/* Trip List */}
            <TripsList />
        </div>
    )
}

export default TripsView