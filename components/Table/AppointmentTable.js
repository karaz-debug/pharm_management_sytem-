import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AppointmentTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [AppointementPerPagge] = useState(500);
    const [Appointement, setAppointement] = useState([]);
    const [error, setError] = useState("")



    useEffect(() => {
        const fetchAppointement = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/monitor/patient');
                setAppointement(data.patients);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAppointement();
    }, []);
    const indexOfLastdrug = currentPage * AppointementPerPagge;
    const indexOfFirstdrug = indexOfLastdrug - AppointementPerPagge;
    // const currentAppointement = Appointement.slice(indexOfFirstdrug, indexOfLastdrug);

    // const searchDrug = useSelector((state) => state.Appointementearch.searchDrug);
    // const searchResultDrug = useSelector((state) => state.Appointementearch.searchResultDrug);
    const currentAppointement = Appointement.slice(indexOfFirstdrug, indexOfLastdrug);
    const AppointementToRender = currentAppointement;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const [editingRow, setEditingRow] = useState(null);
    const [updatedAppointement, setUpdatedAppointement] = useState([]);
    const [medicineField, setMedicineField] = useState({});

    useEffect(() => {
        if (updatedAppointement) {
            setMedicineField({
                invoiceNumber: updatedAppointement.invoiceNumber || "",
                customer: updatedAppointement.customer || "",
                paymentType: updatedAppointement.paymentType || "",
                date: updatedAppointement.date || "",
                contact: updatedAppointement.contact || "",
                total: updatedAppointement.total || "",
                paid: updatedAppointement.paid || "",
            });
        } else {
            setMedicineField({
                invoiceNumber: "",
                customer: "",
                paymentType: "",
                date: "",
                contact: "",
                total: "",
                paid: "",
            });
        }
    }, [updatedAppointement]);


    // Edit drug
    const handleEdit = (invoice) => {
        setUpdatedAppointement(invoice);
        setEditingRow(invoice._id);
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setMedicineField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async (invoice) => {
        try {

            const updatedAppointement = {
                ...medicineField,
            };
            const response = await fetch(`http://localhost:3001/admin/invoice/${invoice._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedAppointement)
            });

            console.log(response)
            setMedicineField("");
            setEditingRow(null);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCancel = () => {
        setEditingRow(null);
    };


    // Delete a drug
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/admin/invoice/${id}`, {
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
                        {AppointementToRender.map((invoice) => (
                            <tr key={invoice._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === invoice._id ? (<input
                                        type="text"
                                        name="name"
                                        className={`w-full border border-gray-300 px-3 py-2 ${editingRow === invoice._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                        value={medicineField.name}
                                        onChange={handleFieldChange}
                                    />
                                    ) : (
                                        invoice.first_name
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === invoice._id ? (
                                        <input
                                            type="text"
                                            name="dosage"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === invoice._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={medicineField.dosage}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        invoice.phone
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === invoice._id ? (
                                        <input
                                            type="text"
                                            name="quantity"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === invoice._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={medicineField.quantity}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        moment(invoice.dop).format('MMM DD, YYYY')
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === invoice._id ? (
                                        <input
                                            type="text"
                                            name="quantity"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === invoice._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={medicineField.quantity}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        moment(invoice.dob).format('MMM DD, YYYY')
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === invoice._id ? (<input
                                        type="text"
                                        name="Supplier"
                                        className={`w-full border border-gray-300 px-3 py-2 ${editingRow === invoice._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                        value={medicineField.Supplier}
                                        onChange={handleFieldChange}
                                    />
                                    ) : (
                                        invoice.health_issues
                                    )}

                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === invoice._id ? (
                                        <input
                                            type="text"
                                            name="manufucture"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === invoice._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={medicineField.manufucture}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        invoice.insurance_company
                                    )}
                                </td>



                                <td className="px-6 py-4 text-sm font-medium text-right">
                                    {editingRow === invoice._id ? (
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                onClick={() => handleSaveChanges(invoice)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                className={`p-2 ${invoice.status === true ? 'text-green-600 ' : 'text-red-600 '} rounded-full hover:text-blue-900 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 focus:text-blue-900`}
                                                onClick={() => handleApprove(invoice._id)}
                                            >
                                                {invoice.status === true ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>}
                                            </button>
                                            <Link href={`/doctor/${invoice._id}`}
                                                className={`p-2 text-blue-600 rounded-full hover:text-blue-900 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 focus:text-blue-900`}
                                                onClick={() => handleView(invoice._id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12a2 2 0 114 0 2 2 0 01-4 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </Link>

                                        </div>

                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(Appointement.length / AppointementPerPagge) }, (_, index) => {
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

export default AppointmentTable;

