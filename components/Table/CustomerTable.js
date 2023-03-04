import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CustomerTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [CustomerPerPagge] = useState(5);
    const [Customer, setCustomer] = useState([]);
    const [Error, setError] = useState("");


    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/admin/customer');
                setCustomer(data.customers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCustomer();
    }, []);
    const indexOfLastcustomer = currentPage * CustomerPerPagge;
    const indexOfFirstcustomer = indexOfLastcustomer - CustomerPerPagge;
    const currentCustomer = Customer.slice(indexOfFirstcustomer, indexOfLastcustomer);
    const CustomerToRender = currentCustomer;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const [editingRow, setEditingRow] = useState(null);
    const [updatedCustomer, setUpdatedCustomer] = useState([]);
    const [customerField, setcustomerField] = useState({});

    useEffect(() => {
        if (updatedCustomer) {
            setcustomerField({
                name: updatedCustomer.name || "",
                address: updatedCustomer.address || "",
                email: updatedCustomer.email || "",
                phone: updatedCustomer.phone || "",
            });
        } else {
            setcustomerField({
                name: "",
                address: "",
                email: "",
                phone: "",
            });
        }
    }, [updatedCustomer]);


    // Edit customer
    const handleEdit = (customer) => {
        setUpdatedCustomer(customer);
        setEditingRow(customer._id);
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setcustomerField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async (customer) => {
        try {

            const updatedCustomer = {
                ...customerField,
            };
            const response = await fetch(`http://localhost:3001/admin/customer/${customer._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedCustomer)
            });

            console.log(response)
            setcustomerField("");
            setEditingRow(null);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCancel = () => {
        setEditingRow(null);
    };


    // Delete a customer
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/admin/customer/${id}`, {
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
                    setError('Not Found: The customer entry with the specified ID does not exist.');
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
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Phone

                            </th>

                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Address
                            </th>

                            <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {CustomerToRender.map((customer) => (
                            <tr key={customer._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === customer._id ? (<input
                                        type="text"
                                        name="name"
                                        className={`w-full border border-gray-300 px-3 py-2 ${editingRow === customer._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                        value={customerField.name}
                                        onChange={handleFieldChange}
                                    />
                                    ) : (
                                        customer.name
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === customer._id ? (
                                        <input
                                            type="text"
                                            name="address"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === customer._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={customerField.address}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        customer.address
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === customer._id ? (
                                        <input
                                            type="text"
                                            name="email"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === customer._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={customerField.email}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        customer.email
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === customer._id ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === customer._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={customerField.phone}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        customer.phone
                                    )}
                                </td>


                                <td className="px-6 py-4 text-sm font-medium text-right">
                                    {editingRow === customer._id ? (
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                onClick={() => handleSaveChanges(customer)}
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
                                                onClick={() => handleEdit(customer)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleDelete(customer._id)}
                                            >
                                                Delete
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
                {Array.from({ length: Math.ceil(Customer.length / CustomerPerPagge) }, (_, index) => {
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

export default CustomerTable;

