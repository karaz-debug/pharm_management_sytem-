import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AppointmentTable = ({ patients }) => {
    const [appointments, setAppointment] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage] = useState(500);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/monitor/patient');
                setAppointment(data.patients);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAppointments();
    }, []);



    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;

    const searchRange = useSelector((state) => state.searchappointment.searchRange);
    const searchRangeappointments = useSelector((state) => state.searchappointment.searchRangeappointments);

    const searchPatientName = useSelector((state) => state.searchappointment.searchPatientName);
    const searchPatientResult = useSelector((state) => state.searchappointment.searchPatientResult);

    const currentAppointment = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
    let appointmentsToRender = currentAppointment;

    if (searchRange) {
        appointmentsToRender = searchRangeappointments;
    } else if (searchPatientName) {
        appointmentsToRender = searchPatientResult;
    }



    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div>
            <div className="overflow-hidden overflow-x-scroll border rounded-lg">
                <table className="w-full">
                    <thead className=" bg-gray-50">
                        <tr >
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Patient Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Contact No
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Appointed Date

                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Date of birth
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Health Issue
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Insuarance Company
                            </th>

                            <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {appointmentsToRender.map((invoice) => (
                            <tr key={invoice._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">

                                    {invoice.first_name}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {invoice.phone}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">

                                    {moment(invoice.dop).format('MMM DD, YYYY')}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">

                                    {moment(invoice.dob).format('MMM DD, YYYY')}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">

                                    {invoice.health_issues}


                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {invoice.insurance_company}
                                </td>



                                <td className="px-6 py-4 text-sm font-medium text-right">

                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            className={`p-2 ${invoice.status === true ? 'text-green-600 ' : 'text-red-600 '} rounded-full hover:text-blue-900 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 focus:text-blue-900`}
                                        >
                                            {invoice.status === true ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>}
                                        </button>
                                        <Link href={`/doctor/${invoice._id}`}
                                            className={`p-2 text-blue-600 rounded-full hover:text-blue-900 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 focus:text-blue-900`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12a2 2 0 114 0 2 2 0 01-4 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </Link>

                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(appointments.length / appointmentsPerPage) }, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <button
                            key={pageNumber}
                            className={`mr-4 rounded-full py-2 px-4 btn btn-blue bg-slate-200    ${pageNumber === currentPage ? 'active' : ''}`}
                            onClick={() => paginate(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AppointmentTable;

export async function getServerSideProps() {
    try {
        const { data } = await axios.get('http://localhost:3001/monitor/patient');
        console.log(data); // log data to check that it contains the expected data
        return {
            props: {
                patients: data.patients,
            },
        };
    } catch (error) {
        console.error(error); // log any errors to the console
        return {
            props: {
                patients: [],
                error: error.message,
            },
        };
    }
}
