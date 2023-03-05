import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const InvoiceTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [invocesPerPagge] = useState(500);
    const [Invoces, setInvoces] = useState([]);
    const [error, setError] = useState("")



    useEffect(() => {
        const fetchInvoces = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/admin/invoices');
                setInvoces(data.invoices);
            } catch (error) {
                console.error(error);
            }
        };

        fetchInvoces();
    }, []);
    const indexOfLastdrug = currentPage * invocesPerPagge;
    const indexOfFirstdrug = indexOfLastdrug - invocesPerPagge;
    // const currentInvoces = Invoces.slice(indexOfFirstdrug, indexOfLastdrug);

    // const searchDrug = useSelector((state) => state.Invocesearch.searchDrug);
    // const searchResultDrug = useSelector((state) => state.Invocesearch.searchResultDrug);
    const currentInvoces = Invoces.slice(indexOfFirstdrug, indexOfLastdrug);
    const InvocesToRender = currentInvoces;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const [editingRow, setEditingRow] = useState(null);
    const [updatedInvoces, setUpdatedInvoces] = useState([]);
    const [medicineField, setMedicineField] = useState({});

    useEffect(() => {
        if (updatedInvoces) {
            setMedicineField({
                invoiceNumber: updatedInvoces.invoiceNumber || "",
                customer: updatedInvoces.customer || "",
                paymentType: updatedInvoces.paymentType || "",
                date: updatedInvoces.date || "",
                contact: updatedInvoces.contact || "",
                total: updatedInvoces.total || "",
                paid: updatedInvoces.paid || "",
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
    }, [updatedInvoces]);


    // Edit drug
    const handleEdit = (invoice) => {
        setUpdatedInvoces(invoice);
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

            const updatedInvoces = {
                ...medicineField,
            };
            const response = await fetch(`http://localhost:3001/admin/invoice/${invoice._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedInvoces)
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
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Invoice Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Date

                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Total Discount
                            </th>


                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Net Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Paid
                            </th>

                            <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {InvocesToRender.map((invoice) => (
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
                                        invoice.customer
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
                                        invoice.invoiceNumber
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
                                        invoice.date
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
                                        invoice.discount
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
                                        invoice.total
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === invoice._id ? (<input
                                        type="text"
                                        name="category"
                                        className={`w-full border border-gray-300 px-3 py-2 ${editingRow === invoice._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                        value={medicineField.category}
                                        onChange={handleFieldChange}
                                    />
                                    ) : (
                                        invoice.paid
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
                                                className="p-2 text-red-600 rounded-full hover:text-red-900 hover:bg-red-100 focus:outline-none focus:bg-red-100 focus:text-red-900"
                                                onClick={() => handleDelete(invoice._id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(Invoces.length / invocesPerPagge) }, (_, index) => {
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

export default InvoiceTable;

