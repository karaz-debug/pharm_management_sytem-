import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchPatientName } from '../slice/appointementSlice';
import { setSearchResultCustomer } from '../slice/categorySlice';
import { setSearchResultDrug } from '../slice/drugSlice';
import { setSearchResultInvoice } from '../slice/invoiceSlice';
import { setSearchResult } from '../slice/searchSlice';
import { setSearchSupplier } from '../slice/supplierSLice';

function SearchBar({ placeholder }) {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    console.log(query)

    useEffect(() => {
        if (query !== '') {
            async function fetchData() {
                const response = await fetch(`http://localhost:3001/monitor/patient?name=${query}`);
                const result = await response.json();
                dispatch(setSearchPatientName({ query, result: result.patients }));
            }
            fetchData();
        } else {
            dispatch(setSearchPatientName({ query: '', result: [] }));
        }
    }, [query, dispatch]);

    useEffect(() => {
        if (query !== '') {
            async function fetchData() {
                const response = await fetch(`http://localhost:3001/admin/stock?supplier=${query}`);
                const result = await response.json();
                dispatch(setSearchResult({ query, result: result.stocks }));
            }

            fetchData();
        } else {
            dispatch(setSearchResult({ query: '', result: [] }));
        }

    }, [query, dispatch]);

    useEffect(() => {
        if (query !== '') {
            async function fetchData() {
                const response = await fetch(`http://localhost:3001/admin/drugs?name=${query}`);
                const result = await response.json();
                dispatch(setSearchResultDrug({ query, result: result.drugs }));
            }

            fetchData();
        } else {
            dispatch(setSearchResultDrug({ query: "", result: [] }));
        }
    }, [query, dispatch]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3001/admin/invoices?name=${query}`);
            const result = await response.json();
            dispatch(setSearchResultInvoice({ query, result: result.invoices }));
        }

        fetchData();
    }, [query, dispatch]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(`http://localhost:3001/admin/users?name=${query}`);
    //         const result = await response.json();
    //         dispatch(setSearchResultUser({ query, result: result.users }));
    //     }

    //     fetchData();
    // }, [query, dispatch]);

    useEffect(() => {
        if (query !== '') {
            async function fetchData() {
                const response = await fetch(`http://localhost:3001/admin/customer?name=${query}`);
                const result = await response.json();
                dispatch(setSearchResultCustomer({ query, result: result.customers }));
            }

            fetchData();
        } else {
            dispatch(setSearchResultCustomer({ query: "", result: [] }));
        }

    }, [query, dispatch]);

    useEffect(() => {
        if (query !== '') {
            async function fetchData() {
                const response = await fetch(`http://localhost:3001/admin/supplier?name=${query}`);
                const result = await response.json();
                dispatch(setSearchSupplier({ query, result: result.suppliers }));
            }

            fetchData();
        } else {
            dispatch(setSearchSupplier({ query: '', result: [] }));
        }

    }, [query, dispatch]);



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
