'use client'
import React, { useState } from 'react'
import Search from '../search-input'
import Toggle from '../group-buttons'
import TripsList from './trips-list'
import Header from '../header'

function TripsView() {

    const [searchInput, setSearchInput] = useState<string>('');
    function handleSearchUpdate(value: string) {
        setSearchInput(value);

    }
    return (
        <div id="main" className="min-h-screen bg-gray-100 font-sans">
            {/* Header */}
            <Header />

            {/* Search Section */}
            <Search placeholder='Search trips' handleSearchUpdate={handleSearchUpdate} />

            {/* Button Group */}
            <Toggle />

            {/* Trip List */}
            <TripsList searchInput={searchInput} />
        </div>
    )
}

export default TripsView