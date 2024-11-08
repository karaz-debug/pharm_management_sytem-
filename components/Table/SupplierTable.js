import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SupplierTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [supplierPerPage] = useState(10);
    const [supplier, setsupplier] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchsupplier = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/admin/supplier');
                setsupplier(data.suppliers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchsupplier();
    }, []);

    const indexOfLastSupplier = currentPage * supplierPerPage;
    const indexOfFirstSupplier = indexOfLastSupplier - supplierPerPage;

    const searchSupplier = useSelector((state) => state.searchsupplier.searchSupplier);
    const searchResultSupplier = useSelector((state) => state.searchsupplier.searchResultSupplier);
    const currentSupplier = supplier?.slice(indexOfFirstSupplier, indexOfLastSupplier);
    const SupplierToRender = searchSupplier ? searchResultSupplier : currentSupplier

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [editingRow, setEditingRow] = useState(null);
    const [updatedSupplier, setupdatedSupplier] = useState([]);
    const [FieldSupplier, setFieldSupplier] = useState({});

    useEffect(() => {
        if (updatedSupplier) {
            setFieldSupplier({
                name: updatedSupplier.name || "",
                address: updatedSupplier.address || "",
                email: updatedSupplier.email || "",
                phone: updatedSupplier.phone || "",
            });
        } else {
            setFieldSupplier({
                name: "",
                address: "",
                email: "",
                phone: "",
            });
        }
    }, [updatedSupplier]);


    // Edit Stock
    const handleEdit = (supplier) => {
        setupdatedSupplier(supplier);
        setEditingRow(supplier._id);
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setFieldSupplier((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async (supplier) => {
        try {

            const updatedStock = {
                ...FieldSupplier,
            };
            const response = await fetch(`http://localhost:3001/admin/supplier/${supplier._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedStock)
            });

            if (response.ok) {
                alert("Succesfully Edited the supplier");

            } else {
                alert('YOur not authourized || failed to Edit supplier');
            }

            console.log(response)
            setFieldSupplier("");
            setEditingRow(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setEditingRow(null);
    };

    // Delete a stock
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/admin/supplier/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // success, show a message or redirect to a success page
                    alert("Succesfully Deleted the supplier");
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    alert('Your not authourized  to Delete a supplier');
                    setError('Unauthorized: You are not logged in or do not have the admin role.');
                } else if (err.response.status === 404) {
                    setError('Not Found: The stock entry with the specified ID does not exist.');
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            });
    };

    return (
        <div>
            <div className="overflow-hidden overflow-x-scroll border rounded-lg" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 #E5E7EB' }}>
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Supplier name
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Phone
                            </th>

                            <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {SupplierToRender?.map((supplier) => (
                            <tr key={supplier._id}>

                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === supplier._id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === supplier._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={FieldSupplier.name}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        supplier.name
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === supplier._id ? (
                                        <input
                                            type="text"
                                            name="address"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === supplier._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={FieldSupplier.address}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        supplier.address
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === supplier._id ? (
                                        <input
                                            type="text"
                                            name="email"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === supplier._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={FieldSupplier.email}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        supplier.email
                                    )}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === supplier._id ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === supplier._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={FieldSupplier.phone}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        supplier.phone
                                    )}
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-right">
                                    {editingRow === supplier._id ? (
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                onClick={() => handleSaveChanges(supplier)}
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
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                onClick={() => handleEdit(supplier)}
                                            >
                                                Edit
                                            </button>
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    className="p-2 text-red-600 rounded-full hover:text-red-900 hover:bg-red-100 focus:outline-none focus:bg-red-100 focus:text-red-900"
                                                    onClick={() => handleDelete(supplier._id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(supplier?.length / supplierPerPage) }, (_, index) => {
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

export default SupplierTable;

