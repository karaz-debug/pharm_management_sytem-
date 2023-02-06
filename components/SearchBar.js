import React from 'react'

function SearchBar() {
    return (
        <div>
            <input
                className="float-left w-[500px] px-4 py-3 mt-8 mb-4 leading-tight text-gray-700 bg-indigo-100 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                placeholder="Search..."
            />
        </div>
    )
}

export default SearchBar
