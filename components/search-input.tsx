'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function Search({ placeholder }: { placeholder: string }) {
  const [searchInput, setSearchInput] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    setSearchInput(term);
  }
  const handleClickSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set('query', searchInput);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <section className="text-center p-8">
      <h1 className="text-3xl font-bold mb-2">The places you dream of</h1>
      <p className="text-lg text-gray-600 mb-4">Let's live new adventures</p>
      <div className="flex justify-center items-center max-w-md mx-auto border rounded-3xl p-1 bg-white">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClickSearch();
            }
          }}
          className="flex-grow p-2 rounded-3xl"
        />
        <button className="bg-black text-white px-4 py-2 rounded-3xl"
          onClick={(e) => {
            handleClickSearch();
          }}>Search</button>
      </div>
    </section>
  )
}

export default Search