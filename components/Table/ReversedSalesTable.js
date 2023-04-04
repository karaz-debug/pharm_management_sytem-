import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const ReversedSalesTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [reversalPerPage] = useState(5);
    const [reversal, setreversal] = useState([]);
    // console.log(reversal)
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchreversal = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/admin/reversal');
                setreversal(data.reversal);
            } catch (error) {
                console.error(error);
            }
        };

        fetchreversal();
    }, []);
    const indexOfLastdrug = currentPage * reversalPerPage;
    const indexOfFirstdrug = indexOfLastdrug - reversalPerPage;
    // const currentreversal = reversal.slice(indexOfFirstdrug, indexOfLastdrug);


    const currentreversal = reversal.slice(indexOfFirstdrug, indexOfLastdrug);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Edit drug
    const handleEdit = (drug) => {


    }


    // Delete a drug
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/admin/drug/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // success, show a message or redirect to a success page
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    setError('Unauthorized: You are not logged in or do not have the admin role.');
                } else if (err.response.status === 404) {
                    setError('Not Found: The drug entry with the specified ID does not exist.');
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            });
    };



    return (
        <div>
            <div className="overflow-hidden overflow-x-scroll border rounded-lg">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Item ID
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Item Name
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Reason for reversal
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Date created
                            </th>




                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                pending
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                approved
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                rejected
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentreversal.map((drug) => (
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {drug._id}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {drug.dosage}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {drug.quantity}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {drug.manufucture}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {drug.category}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <a onClick={() => handleEdit(drug)} className="text-green-500 hover:text-green-700" href="#">
                                        Edit
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <a onClick={() => handleDelete(drug._id)} className="text-red-500 hover:text-red-700" href="#">
                                        Delete
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <a onClick={() => handleDelete(drug._id)} className="text-red-500 hover:text-red-700" href="#">
                                        Delete
                                    </a>
                                </td>
                            </tr>



                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(reversal.length / reversalPerPage) }, (_, index) => {
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
    )
}

export default ReversedSalesTable;

