import Image from 'next/image'
import React from 'react'
import logo from '@/public/images/exoticca-logo-white-small.png'

function Header() {
    return (
        <header className="bg-black text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">
                <Image src={logo} alt='Dream Trips by Exoticca' />
            </div>
            <button className="bg-white text-black px-4 py-2">Create new trip</button>
        </header>
    )
}

export default Header