import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PrescriptionTable = () => {
    const [Prescription, SetPrescription] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [PrescriptionPerPage] = useState(500);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPrescription = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/monitor/patient');
                SetPrescription(data.patients);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPrescription();
    }, []);



    const indexOfLastAppointment = currentPage * PrescriptionPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - PrescriptionPerPage;


    const searchPatientName = useSelector((state) => state.searchappointment.searchPatientName);
    const searchPatientResult = useSelector((state) => state.searchappointment.searchPatientResult);

    const currentAppointment = Prescription.slice(indexOfFirstAppointment, indexOfLastAppointment);
    let PrescriptionToRender = searchPatientName ? searchPatientResult : currentAppointment;




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
                                Health Report
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Prescription
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {PrescriptionToRender.map((invoice) => (
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

                                    {invoice.patient_health_report}


                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {invoice.prescriptions}
                                </td>




                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(Prescription.length / PrescriptionPerPage) }, (_, index) => {
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

export default PrescriptionTable;

// export async function getServerSideProps() {
//     try {
//         const { data } = await axios.get('http://localhost:3001/monitor/patient');
//         console.log(data); // log data to check that it contains the expected data
//         return {
//             props: {
//                 patients: data.patients,
//             },
//         };
//     } catch (error) {
//         console.error(error); // log any errors to the console
//         return {
//             props: {
//                 patients: [],
//                 error: error.message,
//             },
//         };
//     }
// }
