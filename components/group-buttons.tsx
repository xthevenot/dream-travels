import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

function Toggle() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center rounded-md mb-8">
      <Link href="/" className={"px-4 py-2 " + (pathname === '/' ? 'bg-gray-200' : 'bg-white') + " text-black border border-gray-200 rounded-s-lg"}>All</Link>
      <Link href="/upcoming" className={"px-4 py-2 " + (pathname === '/upcoming' ? 'bg-gray-200' : 'bg-white') + " text-black border border-gray-200 "}>Upcoming</Link>
      <Link href="/completed" className={"px-4 py-2 " + (pathname === '/completed' ? 'bg-gray-200' : 'bg-white') + " text-black border border-gray-200 rounded-e-lg"}>Completed</Link>
    </div>
  )
}

export default Toggle