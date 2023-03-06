import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResultCategory } from '../slice/categorySlice';
import { setSearchResultDrug } from '../slice/drugSlice';
import { setSearchResult } from '../slice/searchSlice';
import { setSearchResultUser } from '../slice/userSlice';

function SearchBar({ placeholder }) {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(`http://localhost:3001/admin/stock?supplier=${query}`);
    //         const result = await response.json();
    //         dispatch(setSearchResult({ query, result: result.stocks }));
    //     }

    //     fetchData();
    // }, [query, dispatch]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(`http://localhost:3001/admin/drugs?name=${query}`);
    //         const result = await response.json();
    //         dispatch(setSearchResultDrug({ query, result: result.drugs }));
    //     }

    //     fetchData();
    // }, [query, dispatch]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(`http://localhost:3001/admin/category?name=${query}`);
    //         const result = await response.json();
    //         dispatch(setSearchResultCategory({ query, result: result.categories }));
    //     }

    //     fetchData();
    // }, [query, dispatch]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(`http://localhost:3001/admin/users?name=${query}`);
    //         const result = await response.json();
    //         dispatch(setSearchResultUser({ query, result: result.users }));
    //     }

    //     fetchData();
    // }, [query, dispatch]);

    const searchDrug = useSelector((state) => state.search.searchQuery)
    const searchResult = useSelector((state) => state.search.searchResult)

    // console.log("this is search query", searchQuery)
    // console.log("and this is search Result", searchResult)


    return (
        <div>
            <input
                className="float-left w-[300px] px-4 py-3 mt-8 mb-4 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
