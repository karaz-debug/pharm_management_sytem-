import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppointments } from '../../slice/appointementSlice';

function FilterAppontements() {
    const [range, setRange] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (range !== '') {
            async function fetchData() {
                const response = await fetch(`http://localhost:3001/monitor/appointments?range=${range}`);
                const result = await response.json();
                dispatch(setAppointments({ range, result }));
                console.log(result)
            }
            fetchData();
        }

        else {
            dispatch(setAppointments({ query: '', result: [] }));
        }


    }, [range, dispatch]);

    const searchRange = useSelector((state) => state.appointment?.searchRange);

    const appointments = useSelector(state => state.appointment?.appointments);

    console.log("search Range are: ", searchRange, "and appointment are", appointments)
    return (
        <div>
            <div className="flex items-center space-x-4">
                <label htmlFor="range-select" className="text-sm font-medium text-gray-700">
                    Select Day
                </label>
                <div className="relative">
                    <select
                        id="range-select"
                        name="range-select"
                        className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                    >
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="last week">Last Week</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterAppontements;
