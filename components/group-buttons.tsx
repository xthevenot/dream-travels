import Link from 'next/link'
import React from 'react'

function Toggle() {
    return (
        <div className="flex justify-center rounded-md mb-8">
            <Link href="/" className="px-4 py-2 bg-black text-white border border-gray-200 rounded-s-lg">All</Link>
            <Link href="/upcoming" className="px-4 py-2 bg-gray-200 text-black border-t border-b border-gray-200">Upcoming</Link>
            <Link href="/completed" className="px-4 py-2 bg-gray-200 text-black border border-gray-200 rounded-e-lg">Completed</Link>
        </div>


        /* <div class="inline-flex rounded-md shadow-sm" role="group">
          <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Profile
          </button>
          <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Settings
          </button>
          <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Messages
          </button>
        </div> */

    )
}

export default Toggle